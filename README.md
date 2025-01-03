# Park Ranking API

This API was design to read and modify a ranking of parks in Warsaw. After an installation and starting a program, API is available on URL: http://localhost:8080/parks

## Endpoints

### Get a list of parks

GET ""

Returns a list of parks ordered by id.

### Get a ranking of parks

GET "/ranking"

Returns a list of parks ordered by score. Optional parameters are:

- latitude (default value: 52.2278197)
- logitude (default value: 21.0028638)
- weight (default value: 0)

In the ranking the localization is taken into the account. The distance between client's localization and park is calculated, and the score of a park is given by the formula:

(10 - rating) * (1.0 - weight) + (10 * distance / max) * weight.

This is a weighted arithmetic mean, where "weight" stands for weight of distance component. In the formula "rating" is a double between 0 and 10. "distance" is a distance between client's localization and park. 
"max" is the maximum distance, which is in a table. The number 10 is a scalar. The lower score is better.

### Get a park

GET "/{id}"

Print an information about park of given id.


### Add new park

POST ""

Allow to add new parks to the ranking. Response body will contain list of parks added. Park's properties are:

- id (added automatically)
- name (should be unique)
- district
- rating
- latitude (default value: 52.2278197)
- longitude (default value: 21.0028638)

### Update a park

PATCH "{id}"

Allow to update an existing park.

### Delete a park

DELETE "{id}"

Allow to delete an existing park of given id.
