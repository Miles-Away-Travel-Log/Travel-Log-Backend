import Friend from "../models/friends.model.js";

// post Friend

export async function postFriend(req, res) {
    const { sentRequest, receivedRequest, status } = req.body;

    const exist = await Friend.findOne({
        $or: [
            { sentRequest: sentRequest, receivedRequest: receivedRequest },
            { sentRequest: receivedRequest, receivedRequest: sentRequest },
        ],
    });

    if (exist) {
        return res.status(400).json({ msg: "Friend already exist" });
    }

    try {
        const friend = new Friend({
            sentRequest,
            receivedRequest,
            status,
        });
        await friend.save();
        res.status(200).json({
            message: "Friend added",
            friend: {
                id: friend._id,
                "request from": friend.sentRequest,
                "request to": friend.receivedRequest,
                status: friend.status,
            },
        });
    } catch (error) {
        res.status(400).json(error);
        return;
    }
}

// delete Friend

export async function deleteFriend(req, res) {
    const id = req.params.id;
    const user = await Friend.findById({ _id: id });

    if (!user) {
        res.status(400).send("Friend not found");
        return;
    }

    try {
        await Friend.findByIdAndDelete({ _id: id });
        res.status(200).send("Friend deleted");
    } catch (err) {
        res.status(400).send(err);
    }
}

// Update Friend

export async function updateFriend(req, res) {
    const updatedFriend = req.body;
    const id = req.params.id;

    if (!updatedFriend || !id) {
        res.status(400).json({
            message: "Friend not found",
        });
        return;
    }

    try {
        await Friend.findOneAndUpdate({ _id: id }, updatedFriend);
        res.status(200).send("Friend updated");
    } catch (error) {
        res.status(400).send(error);
    }
}
