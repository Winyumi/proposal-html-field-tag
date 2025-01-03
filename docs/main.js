(() => {
  /**
   * @param {HTMLFormElement} form
   */
  function parseFormFields(form) {
    const fields = form.querySelectorAll("field");
    fields.forEach((field) => {
      const uuid = crypto.randomUUID().replace(/-/g, "");
      const fieldName = field.getAttribute("name");
      const fieldType = field.getAttribute("type");
      const fieldRequired = field.getAttribute("required") !== null;
      const fieldId = `${fieldName}__${uuid}`;

      field.querySelectorAll("label").forEach((label) => {
        label.setAttribute("for", fieldId);
      });
      field.querySelectorAll("input, select, textarea").forEach((el) => {
        el.id = el.id || fieldId;
        el.name = el.name || fieldName;
        el.required = el.required || fieldRequired;
        if (fieldType && el.tagName === "INPUT") el.type = fieldType;
      });

      // Handle required checkboxes
      /** @type {NodeListOf<HTMLInputElement>} */
      const checkboxes = field.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach((el) => {
        if (!fieldRequired) return;
        el.addEventListener("change", () => {
          const hasChecked = Array.from(checkboxes).some((e) => e.checked);
          checkboxes.forEach(
            (e) => (e.required = hasChecked ? e.checked : true)
          );
        });
      });

      // Parse field items
      const fieldItems = field.querySelectorAll("fielditem");
      fieldItems.forEach((item, key) => {
        const inputs = item.querySelectorAll("input");
        const labels = item.querySelectorAll("label");
        inputs.forEach((el) => (el.id += "_" + (key + 1)));
        labels.forEach((el) => (el.htmlFor = inputs[0]?.id));
      });
    });
  }

  /**
   * @param {FormData} formData
   */
  function parseFormData(formData) {
    const data = {};
    for (const [key, value] of formData.entries()) {
      if (data[key]) {
        if (!Array.isArray(data[key])) data[key] = [data[key]];
        data[key].push(value);
      } else {
        data[key] = value;
      }
    }
    return data;
  }

  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    parseFormFields(form);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(parseFormData(new FormData(form)));
      alert("For demo purposes only. Check console for form data.");
    });
  });
})();
