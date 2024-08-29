import Array "mo:base/Array";
import Hash "mo:base/Hash";

import Result "mo:base/Result";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor {
  type LinkPreview = {
    title: Text;
    screenshotUrl: Text;
  };

  stable var linkPreviewsEntries: [(Text, LinkPreview)] = [];
  var linkPreviews = HashMap.HashMap<Text, LinkPreview>(10, Text.equal, Text.hash);

  system func preupgrade() {
    linkPreviewsEntries := Iter.toArray(linkPreviews.entries());
  };

  system func postupgrade() {
    linkPreviews := HashMap.fromIter<Text, LinkPreview>(linkPreviewsEntries.vals(), 10, Text.equal, Text.hash);
    linkPreviewsEntries := [];
  };

  public func saveLinkPreview(url: Text, title: Text, screenshotUrl: Text): async Result.Result<(), Text> {
    linkPreviews.put(url, { title; screenshotUrl });
    #ok(())
  };

  public query func getLinkPreview(url: Text): async ?LinkPreview {
    linkPreviews.get(url)
  };
}
