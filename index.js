import Dropdown from './src/Dropdown.svelte';
import states from './us-states.json'

// STATES - minimal example
new Dropdown({
	target: document.getElementById('states'),
	props: {
		onSelect: ({ item, query }) => console.log(
			item ? `selected id: ${item.abbreviation}` : `query: ${query}`
		),
		staticData: { items: states },
	},
});

// GITHUB - advanced example
new Dropdown({
	target: document.getElementById('github_users'),
	props: {
		numOfResults: 6,
		template: item => `<img src="${item.avatar_url}" />${item.login}`,
		getName: item => item.login,
		onSelect: ({ item, query }) => console.log(
			item ? `selected id: ${item.id}` : `query: ${query}`
		),
		dynamicData: (query, numOfResults) => {
			const url = `https://api.github.com/search/users?q=${query}&per_page=${numOfResults}`
			return fetch(url).then((response) => response.json())
		},
	}
});

