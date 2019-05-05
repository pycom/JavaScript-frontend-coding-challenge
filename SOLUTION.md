# Solution Docs

<!-- You can include documentation, additional setup instructions, notes etc. here -->

## add_endpoint refactoring

See [this](https://github.com/rianf2/javascript-frontend-coding-challenge/tree/add_endpoint) branch

1. In the promises returned from the call to fetch I would use more arrow functions and not mix and match between normal functions and arrow functions.
2. I would also make sure the fetch call worked okay by checking if the response is okay or using a catch the catch any errors and log what went wrong
3. In onQueryChange(query) I would add some checks for the endPoint, for example: checking the string is not undefined or blank.
4. For checking this I would add a Utils.js file and import it to seperate concerns from Autocomplete.
5. I would try adding some basic unit tests. A good candidate would be testing the getUsers function and making sure that urlEndpoint is properly changed for a given input.