# HTML Field Tag

When designing form elements, `input` and `label` are intrinsically linked and rely on each other. Defining `id` and `for` attributes is necessary, but can be cumbersome and repetitive. You might also encounter `id` conflicts if you have multiple similar forms on the same page, such as two login forms in different sections of the website. While it’s possible to wrap the `input` inside a `label`, this approach isn’t semantically ideal and can complicate styling. What if we could group them contextually in a simpler way?

**Before:**

```html
<form>
  <div class="form-control">
    <label for="name">Name</label>
    <input id="name" name="name" required />
  </div>

  <div class="form-control">
    <div>Favorite Fruit</div>
    <div class="form-radio">
      <input
        id="favorite_fruit__apple"
        name="favorite_fruit"
        type="radio"
        value="apple"
        required
      />
      <label for="favorite_fruit__apple">Apple</label>
    </div>
    <div class="form-radio">
      <input
        id="favorite_fruit__orange"
        name="favorite_fruit"
        type="radio"
        value="orange"
        required
      />
      <label for="favorite_fruit__orange">Orange</label>
    </div>
    <div class="form-radio">
      <input
        id="favorite_fruit__lemon"
        name="favorite_fruit"
        type="radio"
        value="lemon"
        required
      />
      <label for="favorite_fruit__lemon">Lemon</label>
    </div>
  </div>

  <div>
    <button type="submit">Log In</button>
  </div>
</form>
```

**After:**

```html
<form>
  <field name="name" required>
    <label>Name</label>
    <input />
  </field>

  <field name="favorite_fruit" type="radio" required>
    <legend>Favorite Fruit</legend>
    <fielditem>
      <input value="apple" />
      <label>Apple</label>
    </fielditem>
    <fielditem>
      <input value="orange" />
      <label>Orange</label>
    </fielditem>
    <fielditem>
      <input value="lemon" />
      <label>Lemon</label>
    </fielditem>
  </field>

  <div>
    <button type="submit">Log In</button>
  </div>
</form>
```

## Demo

Check out the source code of the demo below to see how simple and concise the HTML is. The JavaScript handles the desired behavior, while the CSS is used purely for presentation.

View the demo: https://winyumi.github.io/proposal-html-field-tag/
