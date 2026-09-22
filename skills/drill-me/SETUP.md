# Setup

drill-me has one dependency: a PDF converter. It is installed **once per machine**, before the first session, and the learner never does this in the middle of studying. Session zero checks it with one command and writes the result into `MISSION.md`; after that the skill never asks again.

Everything else the skill needs is already on the machine: the browser that prints a Caderno to PDF is the one Windows ships with.

## Why a converter at all

**The agent does not open PDFs.** It reads the **Transcrição**: the integral text of a PDF in the workspace, converted word for word, never summarised, saved beside the PDF with the same name and a `.md` extension.

The gain is not the format, it is the cut. A 108-page edital costs about 100 thousand tokens in any format, because the page is dense. But the section for one cargo is 2 thousand characters inside 425 thousand, **200 times smaller**: a PDF cannot be cut without being opened whole, while a Transcrição is found with `grep` and read with `sed`. That is where the week's quota is saved.

## Install

Python 3.9 or newer, then:

```
pip install pymupdf4llm
```

Measured against `markitdown` and `pdftotext` on 2026-09-20. `pymupdf4llm` won on the case that matters, the two-column exam paper that nearly every concurso uses: it reads the columns in the right order and marks each question as a heading with its alternatives as a list. `markitdown` interleaves the support-text column with the question column and invents empty tables. `pdftotext -layout` gets the order right but returns flat text with no question boundary.

## Three traps

All three were found in that measurement, and all three are silent.

1. **`use_ocr` defaults to `True`** in `pymupdf4llm` 1.28, and without tesseract installed it breaks the whole conversion, even on a PDF that has a text layer. `tools/transcrever.py` passes `use_ocr=False`. Keep it that way.
2. **A scanned PDF returns an empty file, with no error.** That is why the scan prints `VAZIO` for it, and why it writes one marker line into the `.md` instead of leaving it empty:

   ```
   <!-- VAZIO: PDF escaneado, sem camada de texto. Leia o PDF direto. -->
   ```

   Without the marker the next scan would skip that PDF in silence, and the agent would read an empty file and conclude the document says nothing. A Transcrição that is this one line is the one case where the agent reads the PDF itself, by path, with the file-reading tool.
3. **The install pulls 108 MB**, because `pymupdf4llm` brings `onnxruntime`, `numpy`, `networkx` and `protobuf`. Worth knowing before doing this over a phone connection.

No OCR is installed. Installing tesseract on Windows for the occasional scanned exam does not pay for itself, and the file-reading tool already reads images.

## Check that it works

```
python tools/transcrever.py --check
```

It prints the version and exits. Session zero runs this once and writes one line into `MISSION.md`:

```
- PDF converter: ok, pymupdf4llm 1.28.1 (2026-09-22)
```

## The scan

```
python tools/transcrever.py "<path to the workspace>"
```

One command over the whole folder. It **skips every PDF whose `.md` is newer than it**, so it costs one turn and often none, never one turn per file. The thirteen PDFs of the CAER workspace take a minute or two. It prints one line per PDF: written, skipped, or `VAZIO`.

It runs at Session zero, and at any Opening that finds a PDF with no `.md` beside it: material the learner dropped into the folder, an exam `subagents/find-provas.md` just downloaded.

## When the converter is not there

**Do not improvise and do not try the command a second time.** A denied turn still costs quota.

1. Say in one line what is missing and point at this file.
2. Read PDFs with the file-reading tool, by path, for this session only.
3. Write `- PDF converter: missing, see SETUP.md (<date>)` into `MISSION.md`, so the next session does not retry.

The skill still works this way. It costs about three times the tokens on every PDF, and the cut that makes the edital cheap is gone, so Session zero becomes the expensive session it was before.
