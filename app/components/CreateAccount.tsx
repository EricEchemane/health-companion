import { Stack, Typography, Avatar, TextField, Button, Container, SelectChangeEvent, FormControl, InputLabel, MenuItem, Select, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import useUser from "hooks/useUser";
import useLoadingIndicator from "hooks/with_provider/useLoadingIndicator";
import useNotification from "hooks/with_provider/useNotification";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import { FormEvent, useState } from "react";
import Http from "utils/http";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function CreateAccount() {
    const { error } = useUser({ whenFoundRedirectTo: "/" });
    const { data: session } = useSession();
    const loadingIndicator = useLoadingIndicator();
    const notify = useNotification();

    // form values
    const [birthDate, setBirthDate] = useState<Dayjs | null>(dayjs('03-29-2000'));
    const [yearLevel, setYearLevel] = useState('7');
    const [gender, setGender] = useState('male');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
    };

    return <>
        <Head> <title> Create Account - Health Companion </title> </Head>
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Stack py={4} spacing={3}>
                    <Stack
                        alignItems="center"
                        justifyContent="space-between"
                        direction="row">
                        <Typography
                            variant="h4"
                            component="h1">
                            Create Account
                        </Typography>
                        <Avatar
                            sx={{ width: 60, height: 60 }}
                            alt={session?.user?.name || ""}
                            src={session?.user?.image || ""} />
                    </Stack>
                    <TextField
                        label="Name"
                        defaultValue={session?.user?.name}
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Email"
                        defaultValue={session?.user?.email}
                        inputProps={{ readOnly: true }}
                    />
                    <Stack
                        spacing={2}
                        alignItems="center"
                        direction="row">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Birth Day"
                                value={birthDate}
                                onChange={(newValue) => setBirthDate(newValue)}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                        <FormControl fullWidth>
                            <InputLabel id="year level">Year level</InputLabel>
                            <Select
                                labelId="year level"
                                id="year-level-input"
                                value={yearLevel}
                                label="Year level"
                                onChange={(event: SelectChangeEvent) => {
                                    setYearLevel(event.target.value as string);
                                }}
                            >
                                <MenuItem value={7}>Grade 7</MenuItem>
                                <MenuItem value={8}>Grade 8</MenuItem>
                                <MenuItem value={9}>Grade 9</MenuItem>
                                <MenuItem value={10}>Grade 10</MenuItem>
                                <MenuItem value={11}>Grade 11</MenuItem>
                                <MenuItem value={12}>Grade 12</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <FormControl>
                        <FormLabel id="gender">Gender</FormLabel>
                        <RadioGroup row
                            aria-labelledby="gender"
                            name="gender"
                            value={gender}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setGender((event.target as HTMLInputElement).value);
                            }}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        size="large"
                        variant="contained"> create </Button>
                </Stack>
            </form>
        </Container>
    </>;
}