pragma solidity >=0.4.21 <0.7.0;

contract Election{

    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }

    uint public candidatesCount = 0;

    mapping(address => bool) public voters;

    mapping(uint => Candidate) public candidates;

    event votedEvent(
        uint indexed _candidateId
    );

    constructor() public{
        createCandidate("Candidate 1");
        createCandidate("Candidate 2");
    }

    function createCandidate(string memory _name) public{
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender], "Voter has voted before");

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Candidate ID is not valid");

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        //trigger voted event
        emit votedEvent(_candidateId);
    }
}