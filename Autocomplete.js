export default class Autocomplete {
  constructor(rootEl, options = {}) {
    options = Object.assign({ numOfResults: 10, data: [], endPoint: ""}, options);
    Object.assign(this, { rootEl, options });

    this.init();
  }

  onQueryChange(query) {

      this.getUsers(query, this.options.endPoint).then(users => {
        console.log(users);
        this.updateDropdown(users.slice(0, this.options.numOfResults));
      });

    // Get data for the dropdown
    let results = this.getResults(query, this.options.data);
    results = results.slice(0, this.options.numOfResults);

    this.updateDropdown(results);
  }

  /**
   * Given an array and a query, return a filtered array based on the query.
   */
  getResults(query, data) {
    if (!query) return [];

    // Filter for matching strings
    let results = data.filter((item) => {
      return item.text.toLowerCase().includes(query.toLowerCase());
    });

    return results;
  }

  getUsers(query, endPoint){
    if(!query) return [];

    let urlEndpoint = endPoint.replace("{query}", query);
    let results = fetch(urlEndpoint).then(function(res){
    									                      return res.json();
                                     })
                                     .then(function(data){
                                       return data.items.map(user => ({
                                         text: user.login,
                                         id: user.id
                                       })).filter((user) => {
                                        return user.text.toLowerCase().includes(query.toLowerCase());
                                       })
                                     })
    return results;
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach((result) => {
      const el = document.createElement('li');
      Object.assign(el, {
        className: 'result',
        textContent: result.text,
      });

      // Pass the value to the onSelect callback
      el.addEventListener('click', (event) => {
        const { onSelect } = this.options;
        if (typeof onSelect === 'function') onSelect(result.value);
      });

      fragment.appendChild(el);
    });
    return fragment;
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off',
    });

    inputEl.addEventListener('input', event =>
      this.onQueryChange(event.target.value));

    return inputEl;
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl)

    // Build results dropdown
    this.listEl = document.createElement('ul');
    Object.assign(this.listEl, { className: 'results' });
    this.rootEl.appendChild(this.listEl);
  }
}
