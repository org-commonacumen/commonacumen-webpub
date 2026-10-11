document.querySelectorAll(".page__content pre").forEach((pre) => {
  const block = pre.closest(".highlight") || pre.parentElement;
  if (!block || block.querySelector(".copy-code-button")) return;

  const button = document.createElement("button");
  button.className = "copy-code-button";
  button.type = "button";
  button.textContent = "Copy";
  button.setAttribute("aria-label", "Copy code to clipboard");

  button.addEventListener("click", async () => {
    try {
      const text = pre.innerText;

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("Clipboard copy failed");
      }

      button.textContent = "Copied!";
    } catch {
      button.textContent = "Copy failed";
    }

    window.setTimeout(() => {
      button.textContent = "Copy";
    }, 1500);
  });

  block.appendChild(button);
});
