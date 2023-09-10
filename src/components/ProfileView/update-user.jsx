import { Button, Form } from "react-bootstrap";
import { useState } from "react";


export const UpdateUser = ({ user, token }) => {

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    const updateUser = () => {

        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/users/" + user._id, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                const dataString = JSON.stringify(data);
                localStorage.setItem("user", dataString);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error while fetching data:", error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/users/" + user._id, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    updateUser();
                    alert("Account has been updated.");
                } else {
                    alert("Update failed.");
                }

            });
    }

    if (user) {
        return (
            <>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="editFormUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="6"
                        />
                    </Form.Group>

                    <Form.Group controlId="editFormPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </Form.Group>

                    <Form.Group controlId="editFormEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="editFormBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </>
        )
    }
}