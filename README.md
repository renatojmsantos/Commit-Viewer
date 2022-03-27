# Commit-Viewer
Codacy Challenge

# Install packages
```
npm install
```

# Run Server
````
npm start
````

# Server is on!
```
http://localhost:8000/
```

# Endpoint to retrieve commits
`` GET /commits ``
````
http://localhost:8000/commits
````

# Pagination
`` ?per_page=XXX&page=XXX``
### Example:
````
http://localhost:8000/commits?per_page=2&page=3
````

# Filtering by SHA
`` ?sha=XXXX ```
### Example:
````
http://localhost:8000/commits?sha=fbf64406dfe414acca102c3a0ce2a151c768373c
````

# Run Tests
```
npm test
```


