(() => {
  /**
   * @param {HTMLFormElement} form
   */
  function parseFormFields(form) {
    const fields = form.querySelectorAll("field");
    fields.forEach((field) => {
      const uuid = crypto.randomUUID().replace(/-/g, "");
      const fieldName = field.getAttribute("name");
      const fieldRequired = field.getAttribute("required") !== null;
      const fieldId = `${fieldName}__${uuid}`;

      field.querySelectorAll("label").forEach((label) => {
        label.setAttribute("for", fieldId);
      });
      field.querySelectorAll("input, select, textarea").forEach((el) => {
        el.id = el.id || fieldId;
        el.name = el.name || fieldName;
        el.required = el.required || fieldRequired;
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
      alert("For demo purposes only.");
    });
  });
})();
