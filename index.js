var express = require('express');
var app = express();

app.use(express.static(__dirname));

var apiRouter = express.Router();

apiRouter.get('/books', function(req, res) {
    res.json(books);
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
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 59.99
    },
    {
        "isbn": "9781617291340",
        "title": "C# in Depth",
        "author": ["Jon Skeet"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 33.98
    },
    {
        "isbn": "9780321714114",
        "title": "C++ Primer",
        "author": ["Stanley B. Lippman", "Josée Lajoie", "Barbara E. Moo"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 43.74
    },
    {
        "isbn": "8601300201986",
        "title": "Effective Java",
        "author": ["Joshua Bloch"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 29.69
    },
    {
        "isbn": "9780596009205",
        "title": "Head First Java",
        "author": ["Kathy Sierra", "Bert Bates"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 26.07
    },
    {
        "isbn": "9781491927069",
        "title": "C# 6.0 in a Nutshell: The Definitive Reference",
        "author": ["Joseph Albahari", "Ben Albahari"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 59.99 },
    {
        "isbn": "9781449343507",
        "title": "Head First C#",
        "author": ["Kathy Sierra"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 54.99 },
    {
        "isbn": "9781491921463",
        "title": "C# 6.0 Cookbook",
        "author": ["Jay Hilyard", "Stephen Teilhet"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 54.99
    },
    {
        "isbn": "9781491901632",
        "title": "Hadoop: The Definitive Guide",
        "author": ["Tom White"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 49.99
    },
    {
        "isbn": "9780596517748",
        "title": "JavaScript: The Good Parts",
        "author": ["Douglas Crockford"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 29.99
    },
    {
        "isbn": "9780596805524",
        "title": "JavaScript: The Definitive Guide: Activate Your Web Pages",
        "author": ["David Flanagan"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 49.99
    },
    {
        "isbn": "9781449355739",
        "title": "Learning Python",
        "author": ["Mark Lutz"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 64.99
    },
    {
        "isbn": "9781449359362",
        "title": "Introducing Python: Modern Computing in Simple Packages",
        "author": ["Bill Lubanovic"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 39.99
    },
    {
        "isbn": "9780596516178",
        "title": "The Ruby Programming Language",
        "author": ["David Flanagan", "Yukihiro Matsumoto"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 39.99
    },
    {
        "isbn": "9781449372651",
        "title": "Head First Ruby",
        "author": ["Jay McGavren"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 44.99
    },
    {
        "isbn": "9781491936771",
        "title": "iOS 9 Programming Fundamentals with Swift: Swift, Xcode, and Cocoa Basics",
        "author": ["Matt Neuburg"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 49.99
    },
    {
        "isbn": "9781491936856",
        "title": "Programming iOS 9: Dive Deep into Views, View Controllers, and Frameworks",
        "author": ["Matt Neuburg"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 54.99
    },
    {
        "isbn": "9780134171456",
        "title": "Android Programming: The Big Nerd Ranch Guide",
        "author": ["Bill Phillips", "Chris Stewart", "Brian Hardy", "Kristin Marsicano"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 49.99
    },
    {
        "isbn": "9780201633610",
        "title": "Design Patterns: Elements of Reusable Object-Oriented Software",
        "author": ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides", "Grady Booch"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 59.99
    },
    {
        "isbn": "0000596007124",
        "title": "Head First Design Patterns",
        "author": ["Eric Freeman", "Bert Bates", "Kathy Sierra", "Elisabeth Robson"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 59.99
    },
    {
        "isbn": "9781933988924",
        "title": "Real-World Functional Programming: With Examples in F# and C#",
        "author": ["Tomas Petricek", "Jon Skeet"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 49.99
    },
    {
        "isbn": "9781491949856",
        "title": "Programming Scala: Scalability = Functional Programming + Objects",
        "author": ["Dean Wampler", "Alex Payne"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 49.99
    },
    {
        "isbn": "9781934356807",
        "title": "The Cucumber Book: Behaviour-Driven Development for Testers and Developers",
        "author": ["Matt Wynne", "Aslak Hellesoy"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 30.00
    },
    {
        "isbn": "9780201485677",
        "title": "Refactoring: Improving the Design of Existing Code",
        "author": ["Martin Fowler", "Kent Beck", "John Brant", "William Opdyke", "Don Roberts", "Erich Gamma"],
        "category": { "id": 0, "name": "Computer & Technology" },
        "price": 64.99
    }
];
