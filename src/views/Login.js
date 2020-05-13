import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography, CardActions, Button, TextField, CardHeader } from '@material-ui/core'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <div>
                <Card
                    variant="outlined"
                    style={{ maxWidth: "345px", display: "block", marginLeft: "auto", marginRight: "auto" }}
                >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Login
                            </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <TextField
                                name="username"
                                margin="dense"
                                id="username"
                                label="Username"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={this.state.username}
                            />

                            <TextField
                                name="password"
                                margin="dense"
                                id="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={this.state.password}
                            />
                            <Button
                                style={{ marginBottom: '10px', backgroundColor: '#8bc34a', color: "white", marginTop: "10px" }}
                                size="small"
                                variant="contained"
                                fullWidth
                            >
                                Login
                                </Button>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Login