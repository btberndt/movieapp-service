# movieapp-service
A service providing an HTTP endpoint that gives users the ability to search movies based on title and year of release, using the OMDB API at http://www.omdbapi.com

### Request

A POST request to port 8080 including JSON with key-value pairs for "name" (required) and "year" (optional).

Example:
{
	"name": "Blade Runner",
	"year": "1982"
}

### Response

A successful search will result in the JSON response from the OMDB API at http://www.omdbapi.com. An error response will be sent if the request does not include the "name" key or the incorrect HTTP method is used.
