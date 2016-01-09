# bookshelf-webapp-angular
A exercise of front-end part powered by angular2 of bookshelf project in ThoughtWorks lecture.

## Frameworks and Librarys

+ `Angular@2.*`
+ `Bootstrap@3.*`
+ `jQuery@2.*`
+ `RxJS@5.*`

## API Design

### Range Book Status

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
X-BookShelf-Produced-At: 1452340843657
X-BookShelf-Type: Range<Status>
X-BookShelf-Since: 1
X-BookShelf-Until: 2
X-BookShelf-Count: 2
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

### Range Book Items

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
X-BookShelf-Produced-At: 1452340843657
X-BookShelf-Type: Range
X-BookShelf-Since: 1
X-BookShelf-Until: 2
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

### Single Book Status

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
X-BookShelf-Produced-At: 1452340843657
X-BookShelf-Type: Status
```

Body Example:

```json
{
  "id": 1,
  "updated_at": 1452340843656
}
```

### Single Book Item

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
X-BookShelf-Produced-At: 1452340843657
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

### Range Category Status

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
X-BookShelf-Produced-At: 1452340843657
X-BookShelf-Type: Range<Status>
X-BookShelf-Since: 1
X-BookShelf-Until: 2
X-BookShelf-Count: 2
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

### Range Category Items

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
X-BookShelf-Produced-At: 1452340843657
X-BookShelf-Type: Range
X-BookShelf-Since: 1
X-BookShelf-Until: 2
X-BookShelf-Count: 2
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

### Single Category Status

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
X-BookShelf-Produced-At: 1452340843657
X-BookShelf-Type: Status
```

Body Example:

```json
{
  "id": 1,
  "updated_at": 1452340843656
}
```

### Single Category Item

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
X-BookShelf-Produced-At: 1452340843657
X-BookShelf-Type: Item
```

Body Example:

```json
{
  "id": 3,
  "name": "Biographies & Memoirs"
}
```
