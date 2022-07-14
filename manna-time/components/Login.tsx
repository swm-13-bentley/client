import React from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Checkbox, CssBaseline, FormControl, FormControlLabel, Input, InputLabel, Paper, TextField, Typography, withStyles } from "@mui/material"
import { Center } from "@chakra-ui/react";

// const styles = (theme) => ({
//   main: {
//     width: "auto",
//     display: "block", // Fix IE 11 issue.
//     marginLeft: theme.spacing.unit * 3,
//     marginRight: theme.spacing.unit * 3,
//     [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//       width: 400,
//       marginLeft: "auto",
//       marginRight: "auto"
//     }
//   },
//   paper: {
//     marginTop: theme.spacing.unit * 8,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
//       .spacing.unit * 3}px`
//   },
//   avatar: {
//     margin: theme.spacing.unit,
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing.unit
//   },
//   submit: {
//     marginTop: theme.spacing.unit * 3
//   }
// });

function Login() {

    return (
        <main>
            <CssBaseline />
            <Paper sx={{boxShadow: 4, padding: 3, maxWidth: 400}}>
                <Center mb="20">
                    <Avatar>
                    </Avatar>
                </Center>
                <Center mb="5">
                    <p className="text-xl font-bold">약속 이름</p>
                </Center>
                <Center mb="5">
                    <p className="text-lg font-bold">약속 시간</p>
                </Center>
                <Center mb="15">
                    <p className="text-xs font-bold text-blue-700">회원가입이 필요없어요!</p>
                </Center>
                <Center>
                    <h1></h1>
                </Center>
                <form>
                    <FormControl margin="dense" required fullWidth>
                        <InputLabel className="md:text-md text-sm" >내 이름</InputLabel>
                        <Input size="small" id="myname" name="myname" autoFocus />
                    </FormControl>
                    <FormControl margin="dense" required fullWidth>
                        <InputLabel className="md:text-md text-sm" htmlFor="password">비밀번호</InputLabel>
                        <Input
                            size="small"
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </FormControl>
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        className="mt-5"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        약속시간 정하기
                    </Button>
                </form>
            </Paper>
        </main>
    );
}

export default Login
// export default withStyles(styles)(Login);
