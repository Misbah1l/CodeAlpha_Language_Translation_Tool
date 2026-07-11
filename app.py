from flask import Flask, render_template, request
from deep_translator import GoogleTranslator

app = Flask(__name__)

# Supported Languages
languages = {
    "Auto Detect": "auto",
    "English": "en",
    "Urdu": "ur",
    "Hindi": "hi",
    "French": "fr",
    "German": "de",
    "Spanish": "es",
    "Arabic": "ar",
    "Chinese (Simplified)": "zh-CN",
    "Japanese": "ja",
    "Korean": "ko",
    "Russian": "ru",
    "Italian": "it",
    "Portuguese": "pt",
    "Turkish": "tr",
    "Dutch": "nl",
    "Bengali": "bn",
    "Punjabi": "pa",
    "Persian": "fa"
}


@app.route("/", methods=["GET", "POST"])
def index():

    translated_text = ""
    input_text = ""

    source_language = "auto"
    target_language = "ur"

    error = ""

    if request.method == "POST":

        input_text = request.form.get("text", "").strip()
        source_language = request.form.get("source", "auto")
        target_language = request.form.get("target", "ur")

        if input_text:

            try:

                translator = GoogleTranslator(
                    source=source_language,
                    target=target_language
                )

                translated_text = translator.translate(input_text)
                print("Translated:", translated_text)

            except Exception:

                error = "Unable to translate. Please check your internet connection and try again."

    return render_template(
        "index.html",
        languages=languages,
        translated_text=translated_text,
        input_text=input_text,
        source_language=source_language,
        target_language=target_language,
        error=error
    )


if __name__ == "__main__":
    app.run(debug=True)