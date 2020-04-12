pragma solidity >=0.4.21 <0.6.0;

contract SocialNetwork{
    string public name;
    uint public postCount = 0;

    struct Post{
        uint id;
        string content;
        uint tipAmount;
        address payable author;
    }

    mapping (uint => Post) public posts;

    event postCreated(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    event postTipped(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    constructor() public{
        createPost('This is my first post');
    }

    function createPost(string memory _content) public{
        require(bytes(_content).length > 0, 'Invalid content');
        postCount ++;
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
        emit postCreated(postCount, _content, 0, msg.sender);
    }

    function tipPost(uint _id) public payable{
        require(_id > 0 && _id <= postCount, 'Invalid postID');
        Post memory _post = posts[_id];
        address payable author = _post.author;
        address(author).transfer(msg.value);
        _post.tipAmount += msg.value;
        posts[_id] = _post;
        emit postTipped(_id, _post.content, _post.tipAmount, author);
    }
}