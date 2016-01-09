# bookshelf-webapp-angular
A exercise of front-end part powered by angular2 of bookshelf project in ThoughtWorks lecture.

## Frameworks and Librarys

+ `Angular@2.*`
+ `Bootstrap@3.*`
+ `jQuery@2.*`
+ `RxJS@5.*`


## API Design

This is the just the ideal API interface provided.

### Book Relevant

There is something about book.

#### Query Range Book Status

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/books/status" 
      ["?" (("since=" BOOK-ID) / ("until=" BOOK-ID)) "&" ("count=" DIGITS) ]]
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Range<Status>
X-BookShelf-Since: 1
X-BookShelf-Until: 2
X-BookShelf-Count: 2
X-BookShelf-First: 1
X-BookShelf-Last: 10
X-BookShelf-Total: 8
```

Body Example:

```json
[
  {
    "id": 1,
    "updated_at": 1452340843656
  },
  {
    "id": 2,
    "updated_at": 1452340843655
  }
]
```

#### Query Range Book Items

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/books" 
      ["?" (("since=" BOOK-ID) / ("until=" BOOK-ID)) "&" ("count=" DIGITS) ]]
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Range
X-BookShelf-Since: 1
X-BookShelf-Until: 2
X-BookShelf-Count: 2
X-BookShelf-First: 1
X-BookShelf-Last: 10
X-BookShelf-Total: 8
```

Body Example:

```json
[
  {
    "id": 1,
    "isbn": "9787302380979",
    "title": "CLR via C#",
    "authorIds": [1],
    "categoryId": 1,
    "price": 59.99
  },
  {
    "id": 2,
    "isbn": "9781617291340",
    "title": "C# in Depth",
    "authorIds": [2],
    "categoryId": 1,
    "price": 33.98
  },
  {
    "id": 3,
    "isbn": "9780321714114",
    "title": "C++ Primer",
    "authorIds": [3, 4, 5],
    "categoryId": 1,
    "price": 43.74
  }
]
```

#### Query Single Book Status

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/books/" BOOK-ID "/status"
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Status
```

Body Example:

```json
{
  "id": 1,
  "updated_at": 1452340843656
}
```

#### Query Single Book Item

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/books/" BOOK-ID
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Item
```

Body Example:

```json
{
  "id": 3,
  "isbn": "9780321714114",
  "title": "C++ Primer",
  "authorIds": [3, 4, 5],
  "categoryId": 1,
  "price": 43.74
}
```

#### Query Conditional Book Items

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/books/"
      "&query=" QUERY
QUERY = <Legal bool expressing in javascript of '(data, i)' with urlencoded>
        ; data.title.includes('C#') && data.price <= 60
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Set
X-BookShelf-Count: 2
```

Body Example:

```json
[
  {
    "id": 1,
    "isbn": "9787302380979",
    "title": "CLR via C#",
    "authorIds": [1],
    "categoryId": 1,
    "price": 59.99
  },
  {
    "id": 2,
    "isbn": "9781617291340",
    "title": "C# in Depth",
    "authorIds": [2],
    "categoryId": 1,
    "price": 33.98
  }
]
```

#### Create Book Item

**Request Format:**

Method Type:

```
POST
```

Uri Format:

```abnf
URI = BASE 
      "/books/"
```

Body Example:

```json
{
  "id": null,
  "isbn": "9787302380979",
  "title": "CLR via C#",
  "authorIds": [1],
  "categoryId": 1,
  "price": 59.99
}
```

**Response Format:**

Status Code:

+ 201 for Success.

### Category Relevant

There is something about Category.

#### Query Range Category Status

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/categories/status" 
      ["?" (("since=" CATEGORY-ID) / ("until=" CATEGORY-ID)) "&" ("count=" DIGITS) ]]
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Range<Status>
X-BookShelf-Since: 1
X-BookShelf-Until: 2
X-BookShelf-Count: 2
X-BookShelf-First: 1
X-BookShelf-Last: 10
X-BookShelf-Total: 8
```

Body Example:

```json
[
  {
    "id": 1,
    "updated_at": 1452340843656
  },
  {
    "id": 2,
    "updated_at": 1452340843655
  }
]
```

#### Query Range Category Items

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/categories" 
      ["?" (("since=" CATEGORY-ID) / ("until=" CATEGORY-ID)) "&" ("count=" DIGITS) ]]
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Range
X-BookShelf-Since: 1
X-BookShelf-Until: 2
X-BookShelf-Count: 2
X-BookShelf-First: 1
X-BookShelf-Last: 10
X-BookShelf-Total: 8
```

Body Example:

```json
[
  {
    "id": 1,
    "name": "Computer & Technology"
  },
  {
    "id": 2,
    "name": "Arts & Photography"
  }
]
```

#### Query Single Category Status

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/categories/" CATEGORY-ID "/status"
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Status
```

Body Example:

```json
{
  "id": 1,
  "updated_at": 1452340843656
}
```

#### Query Single Category Item

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/categories/" CATEGORY-ID
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Item
```

Body Example:

```json
{
  "id": 3,
  "name": "Biographies & Memoirs"
}
```

### Author Relevant

There is something about Author.

#### Query Range Author Status

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/authors/status" 
      ["?" (("since=" AUTHOR-ID) / ("until=" AUTHOR-ID)) "&" ("count=" DIGITS) ]]
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Range<Status>
X-BookShelf-Since: 1
X-BookShelf-Until: 2
X-BookShelf-Count: 2
X-BookShelf-First: 1
X-BookShelf-Last: 10
X-BookShelf-Total: 8
```

Body Example:

```json
[
  {
    "id": 1,
    "updated_at": 1452340843656
  },
  {
    "id": 2,
    "updated_at": 1452340843655
  }
]
```

#### Query Range Author Items

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/authors" 
      ["?" (("since=" AUTHORS-ID) / ("until=" AUTHORS-ID)) "&" ("count=" DIGITS) ]]
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Range
X-BookShelf-Since: 1
X-BookShelf-Until: 2
X-BookShelf-Count: 2
X-BookShelf-First: 1
X-BookShelf-Last: 10
X-BookShelf-Total: 8
```

Body Example:

```json
[
  {
    "id": 1,
    "name": "Jeffrey Richter"
  },
  {
    "id": 2,
    "name": "Jon Skeet"
  }
]
```

#### Query Single Author Status

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/authors/" AUTHOR-ID "/status"
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Status
```

Body Example:

```json
{
  "id": 1,
  "updated_at": 1452340843656
}
```

#### Query Single Author Item

**Request Format:**

Method Type:

```
GET
```

Uri Format:

```abnf
URI = BASE 
      "/authors/" AUTHOR-ID
```

**Response Format:**

Headers Example:

```text
X-BookShelf-Type: Item
```

Body Example:

```json
{
  "id": 3,
  "name": "Stanley B. Lippman"
}
```

