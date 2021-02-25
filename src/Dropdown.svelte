<script>
  export let staticData = null;
  export let dynamicData = null;
  export let onSelect;
  export let numOfResults = 8;
  export let getName = (item) => item.name;
  export let template = (item) => getName(item);
  export let query = "";
  export let result = {};
  export let cursor = 0;
  let skipSuggestions = false;

  // $: lines are reactive and executes whenever an included variable changes
  $: handleQueryChange(query, numOfResults);

  async function handleQueryChange(query, numOfResults) {
    if (!query) result = {};
    else if (!skipSuggestions) {
      if (dynamicData) result = await dynamicData(query, numOfResults);
      else {
        const items = staticData.items.filter((item) => getName(item).toLowerCase().match(query.toLowerCase()));
        result = {
          items: items.slice(0, 4),
          total: items.length,
        };
      }
    }
    cursor = 0;
    skipSuggestions = false;
  }

  function handleSubmit() {
    const item = cursor ? result.items[cursor - 1] : null;

    if (item) {
      // don't show the suggestions list after selecting an item
      skipSuggestions = true;
      query = getName(item);
    }

    // clear the result
    result = {};

    // call the onSelect callback
    onSelect({ query, item });
  }

  function handleKeydown(event) {
    const hasItems = result.items && result.items.length;
    const isCursorAtEnd = () => cursor >= result.items.length;

    if (hasItems && event.key === "ArrowDown" && !isCursorAtEnd()) cursor++;
    if (hasItems && event.key === "ArrowUp" && cursor) cursor--;
    if (event.key === "Enter") handleSubmit();
  }
</script>

<div on:keydown={handleKeydown}>
  <form on:submit|preventDefault>
    <input data-index="0" type="text" bind:value={query} class:selected={cursor === 0} />
  </form>
  {#if result.items && result.items}
    <div class="results">
      {#each result.items as item, index}
        <div
          on:mousedown={handleSubmit}
          on:mouseenter={() => (cursor = index + 1)}
          class:selected={index + 1 === cursor}
          class="result"
        >
          {@html template(item, index)}
        </div>
      {:else}
        no results...
      {/each}
    </div>
  {/if}
</div>
