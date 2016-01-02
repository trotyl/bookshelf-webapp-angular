var express = require('express');
var app = express();

app.use(express.static(__dirname));

var apiRouter = express.Router();

apiRouter.get('/books', function(req, res) {
    res.json(books);
});

apiRouter.get('/categories', function (req, res) {
    res.json(categories);
});

app.use('/api', apiRouter);

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

var books = [
    {
        "isbn": "9787302380979",
        "title": "CLR via C#",
        "author": ["Jeffrey Richter"],
        "categoryId": "0",
        "price": 59.99
    },
    {
        "isbn": "9781617291340",
        "title": "C# in Depth",
        "author": ["Jon Skeet"],
        "categoryId": "0",
        "price": 33.98
    },
    {
        "isbn": "9780321714114",
        "title": "C++ Primer",
        "author": ["Stanley B. Lippman", "Josée Lajoie", "Barbara E. Moo"],
        "categoryId": "0",
        "price": 43.74
    },
    {
        "isbn": "8601300201986",
        "title": "Effective Java",
        "author": ["Joshua Bloch"],
        "categoryId": "0",
        "price": 29.69
    },
    {
        "isbn": "9780596009205",
        "title": "Head First Java",
        "author": ["Kathy Sierra", "Bert Bates"],
        "categoryId": "0",
        "price": 26.07
    },
    {
        "isbn": "9781491927069",
        "title": "C# 6.0 in a Nutshell: The Definitive Reference",
        "author": ["Joseph Albahari", "Ben Albahari"],
        "categoryId": "0",
        "price": 59.99 },
    {
        "isbn": "9781449343507",
        "title": "Head First C#",
        "author": ["Kathy Sierra"],
        "categoryId": "0",
        "price": 54.99 },
    {
        "isbn": "9781491921463",
        "title": "C# 6.0 Cookbook",
        "author": ["Jay Hilyard", "Stephen Teilhet"],
        "categoryId": "0",
        "price": 54.99
    },
    {
        "isbn": "9781491901632",
        "title": "Hadoop: The Definitive Guide",
        "author": ["Tom White"],
        "categoryId": "0",
        "price": 49.99
    },
    {
        "isbn": "9780596517748",
        "title": "JavaScript: The Good Parts",
        "author": ["Douglas Crockford"],
        "categoryId": "0",
        "price": 29.99
    },
    {
        "isbn": "9780596805524",
        "title": "JavaScript: The Definitive Guide: Activate Your Web Pages",
        "author": ["David Flanagan"],
        "categoryId": "0",
        "price": 49.99
    },
    {
        "isbn": "9781449355739",
        "title": "Learning Python",
        "author": ["Mark Lutz"],
        "categoryId": "0",
        "price": 64.99
    },
    {
        "isbn": "9781449359362",
        "title": "Introducing Python: Modern Computing in Simple Packages",
        "author": ["Bill Lubanovic"],
        "categoryId": "0",
        "price": 39.99
    },
    {
        "isbn": "9780596516178",
        "title": "The Ruby Programming Language",
        "author": ["David Flanagan", "Yukihiro Matsumoto"],
        "categoryId": "0",
        "price": 39.99
    },
    {
        "isbn": "9781449372651",
        "title": "Head First Ruby",
        "author": ["Jay McGavren"],
        "categoryId": "0",
        "price": 44.99
    },
    {
        "isbn": "9781491936771",
        "title": "iOS 9 Programming Fundamentals with Swift: Swift, Xcode, and Cocoa Basics",
        "author": ["Matt Neuburg"],
        "categoryId": "0",
        "price": 49.99
    },
    {
        "isbn": "9781491936856",
        "title": "Programming iOS 9: Dive Deep into Views, View Controllers, and Frameworks",
        "author": ["Matt Neuburg"],
        "categoryId": "0",
        "price": 54.99
    },
    {
        "isbn": "9780134171456",
        "title": "Android Programming: The Big Nerd Ranch Guide",
        "author": ["Bill Phillips", "Chris Stewart", "Brian Hardy", "Kristin Marsicano"],
        "categoryId": "0",
        "price": 49.99
    },
    {
        "isbn": "9780201633610",
        "title": "Design Patterns: Elements of Reusable Object-Oriented Software",
        "author": ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides", "Grady Booch"],
        "categoryId": "0",
        "price": 59.99
    },
    {
        "isbn": "0000596007124",
        "title": "Head First Design Patterns",
        "author": ["Eric Freeman", "Bert Bates", "Kathy Sierra", "Elisabeth Robson"],
        "categoryId": "0",
        "price": 59.99
    },
    {
        "isbn": "9781933988924",
        "title": "Real-World Functional Programming: With Examples in F# and C#",
        "author": ["Tomas Petricek", "Jon Skeet"],
        "categoryId": "0",
        "price": 49.99
    },
    {
        "isbn": "9781491949856",
        "title": "Programming Scala: Scalability = Functional Programming + Objects",
        "author": ["Dean Wampler", "Alex Payne"],
        "categoryId": "0",
        "price": 49.99
    },
    {
        "isbn": "9781934356807",
        "title": "The Cucumber Book: Behaviour-Driven Development for Testers and Developers",
        "author": ["Matt Wynne", "Aslak Hellesoy"],
        "categoryId": "0",
        "price": 30.00
    },
    {
        "isbn": "9780201485677",
        "title": "Refactoring: Improving the Design of Existing Code",
        "author": ["Martin Fowler", "Kent Beck", "John Brant", "William Opdyke", "Don Roberts", "Erich Gamma"],
        "categoryId": "0",
        "price": 64.99
    }
];

var categories = [
    { 
        "id": "0",
        "name": "Computer & Technology" 
    },
    {
        "id": "1",
        "name": "Arts & Photography"
    },
    {
        "id": "2",
        "name": "Biographies & Memoirs"
    },
    {
        "id": "3",
        "name": "Business & Money"
    },
    {
        "id": "4",
        "name": "Christian Books & Bibles"
    },
    {
        "id": "5",
        "name": "Comics & Graphic Novels"
    },
    {
        "id": "6",
        "name": "Cookbooks, Food & Wine"
    },
    {
        "id": "7",
        "name": "Crafts, Hobbies & Home"
    },
    {
        "id": "8",
        "name": "Education & Teaching"
    },
    {
        "id": "9",
        "name": "Engineering & Transportation"
    }
];
