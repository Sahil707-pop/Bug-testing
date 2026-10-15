const express = require("express");
const app = express();

app.use(express.json());

const users = [
    { id: 1, name: "Sahil", email: "sahil@example.com" },
    { id: 2, name: "Rahul", email: "rahul@example.com" }
];

app.get("/api/users/:id", (req, res) => {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const email = user.email;
    let maskedEmail;

    if (email && email.includes('@')) {
        maskedEmail = email.replace(/^(.{2}).+(@.+)$/, "$1***$2");
    } else {
        maskedEmail = email;
    }

    res.json({
        id: user.id,
        name: user.name,
        email: maskedEmail
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});