import Text "mo:base/Text";
import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";

actor {
  var question: Text = "What is your favourite course?";

   public query func getQuestion() : async Text {
    question
  };

  var votes: RBTree.RBTree<Text, Nat> = RBTree.RBTree(Text.compare);

// query the list of entries and votes for each one
// Example:
//      * JSON that the frontend will receive using the values above:
//      * [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]
  public query func getVotes(): async [(Text,Nat)] {
    Iter.toArray(votes.entries());
  };


  public func vote(entry:Text):async [(Text,Nat)] {
    // First we want to check if the entry exists in the RBTree:
    // Why? If the entry does not exist in the RBTree, it is saved as null and if it exists it is registered as type NAT.

    let votes_for_entry : ?Nat = votes.get(entry);

    // Now lets process the data gotten above

    let current_votes_for_entry : Nat = switch votes_for_entry{
      case null 0;
      case (?Nat) Nat;
    };

    // Now we have the data to be processed, let update the data tank.

    votes.put(entry, current_votes_for_entry+1);

    // Now lets return the iterator in form of an array for the frontend
    Iter.toArray(votes.entries())
  };

  // Lets declare an expression to reset the vote count 

  public func resetVotes() : async [(Text, Nat )] {
    votes.put("MEE205", 0);
      votes.put("CSC201", 0);
      votes.put("CSC202", 0);
      votes.put("MEE206", 0);
      Iter.toArray(votes.entries())
  };
};

