# Solution Docs

I used Svelte as it's the least verbose tool for the given task. It also allows for exporting webcomponents.

The UI is 100% state driven. There's no direct manipulation of the DOM. Up/down arrow + mouseover will adjust a cursor value and the component will update accordingly.

## API

```javascript
new Dropdown({ target, props })
```

- **target**: HTMLElementF
- **Props**: Object
  - **numOfResults**: `Number`, _default: 8_
  - **template**: `function (item): string` _default: returns the value of GetName()_
  - **getName**: `function (item): string` _default: item => item.name_
  - **onSelect**: `function ({ item, query }): void` _required_
  - **dynamicData**: `async function (query, numOfResults): { items: any[] }` _data source if present_
  - **staticData**: `{ items: any[] }` _required if dynamicData is omitted_

_`query`, `result` and `cursor` are exposed in `props` for programmatic control, but not documented._

## Notes

**onSelect** returns `{item, query}` instead of `id`.

The reason: We may not always need only the `id` and when we do, there's nothing gained by creating an additional method for the same code that could run in `onSelect`. It only adds cognitive overhead.

console.log `id` in item:

```javascript
{
    ...
    onSelect(({item}) => console.log(item.key))
}
```

console.log `id`

```javascript
{
    ...
    resolveId(({item}) => item.key)
    onSelect((id) => console.log(id))
}
```

That said, if returning `id` is a strict requirement, it would take less than a minute to add a `resolveId` callback option.

## Possible improvements

**Throttling.** Would be straight forward to add and should be a requirement in most production scenarios.

**Templates.** The component currently accepts plain functions as templates, but in a Svelte app it should also support Svelte components.

**Tests.** A small test suite would be benefitial in the long run. (I'd go with AVA + Playwright)
