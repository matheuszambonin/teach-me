#!/usr/bin/env python3
"""Transcreve os PDFs de um workspace do drill-me para Markdown.

Cada PDF ganha um .md ao lado, com o mesmo nome. A varredura pula todo PDF
cujo .md ja seja mais novo, entao rodar de novo custa quase nada.

    python tools/transcrever.py "<pasta do workspace>"
    python tools/transcrever.py --check

Um PDF escaneado sai vazio e e marcado VAZIO: esse volta para a leitura de
PDF do proprio agente. Ver SETUP.md.
"""

import os
import sys

# O padrao do pymupdf4llm 1.28 e use_ocr=True, que quebra a conversao inteira
# sem tesseract instalado, mesmo num PDF com camada de texto.
USE_OCR = False

# Abaixo disso a transcricao e tratada como vazia: PDF escaneado devolve
# arquivo vazio em silencio, sem erro.
MIN_CHARS = 200

# Marca gravada no .md de um PDF escaneado, no lugar do arquivo vazio. Sem ela
# a varredura seguinte pularia o arquivo calada e o agente leria nada, em vez
# de saber que aquele PDF se le direto.
MARCA_VAZIO = "<!-- VAZIO: PDF escaneado, sem camada de texto. Leia o PDF direto. -->"


def carregar_conversor():
    try:
        import pymupdf4llm
    except ImportError:
        return None, (
            "pymupdf4llm nao esta instalado. Rode 'pip install pymupdf4llm'. "
            "Ver SETUP.md."
        )
    return pymupdf4llm, None


def versao(modulo):
    try:
        from importlib.metadata import version

        return version("pymupdf4llm")
    except Exception:
        return getattr(modulo, "__version__", "desconhecida")


def precisa_converter(pdf, md):
    if not os.path.exists(md):
        return True
    return os.path.getmtime(md) < os.path.getmtime(pdf)


def converter(pymupdf4llm, pdf, md):
    texto = pymupdf4llm.to_markdown(pdf, use_ocr=USE_OCR)
    tamanho = len(texto.strip())
    if tamanho < MIN_CHARS:
        texto = MARCA_VAZIO + "\n"
    with open(md, "w", encoding="utf-8") as saida:
        saida.write(texto)
    return tamanho


def esta_vazio(md):
    try:
        with open(md, encoding="utf-8") as lido:
            return lido.readline().startswith(MARCA_VAZIO)
    except OSError:
        return False


def varrer(pasta):
    pymupdf4llm, erro = carregar_conversor()
    if erro:
        print(erro, file=sys.stderr)
        return 1

    if not os.path.isdir(pasta):
        print("Pasta nao encontrada: " + pasta, file=sys.stderr)
        return 1

    escritos = pulados = vazios = falhas = 0
    for raiz, _, arquivos in os.walk(pasta):
        for nome in sorted(arquivos):
            if not nome.lower().endswith(".pdf"):
                continue
            pdf = os.path.join(raiz, nome)
            md = os.path.splitext(pdf)[0] + ".md"
            relativo = os.path.relpath(pdf, pasta)

            if not precisa_converter(pdf, md):
                if esta_vazio(md):
                    print("VAZIO   " + relativo + " (escaneado: leia o PDF direto)")
                    vazios += 1
                else:
                    print("PULADO  " + relativo)
                    pulados += 1
                continue

            try:
                tamanho = converter(pymupdf4llm, pdf, md)
            except Exception as falha:
                print("FALHA   " + relativo + ": " + str(falha), file=sys.stderr)
                falhas += 1
                continue

            if tamanho < MIN_CHARS:
                print("VAZIO   " + relativo + " (escaneado: leia o PDF direto)")
                vazios += 1
            else:
                print("ESCRITO " + relativo + " (" + str(tamanho) + " chars)")
                escritos += 1

    print(
        "\n%d escritos, %d pulados, %d vazios, %d falhas"
        % (escritos, pulados, vazios, falhas)
    )
    return 1 if falhas else 0


def checar():
    pymupdf4llm, erro = carregar_conversor()
    if erro:
        print(erro, file=sys.stderr)
        return 1
    print("pymupdf4llm " + versao(pymupdf4llm) + ", use_ocr=False")
    return 0


def main():
    if len(sys.argv) != 2:
        print(__doc__, file=sys.stderr)
        return 2
    if sys.argv[1] == "--check":
        return checar()
    return varrer(sys.argv[1])


if __name__ == "__main__":
    sys.exit(main())
