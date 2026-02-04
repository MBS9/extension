import React from 'react';
import { DataFormat } from "../types";
import { start, getTab, getDomain } from "../utils";
import { Checkbox, Grid, Typography, Box, Button } from '@mui/joy';
import { useForm, Controller } from 'react-hook-form';

export default function FormUI() {
    const [domain, setDomain] = React.useState<string>("");
    const { control, setValue, getValues, subscribe, reset } = useForm<DataFormat>({
        defaultValues: {
            autoStart: false,
            exceptions: [],
            options: {
                fonts: true,
                colors: true,
                spacing: true,
                sizes: true,
                autoplay: true,
            },
        },
    });
    subscribe({
        formState: { values: true, isDirty: true },
        callback: ({ values, isDirty }) => {
            if (isDirty) {
                chrome.storage.sync.set(values);
            }
        }
    });
    React.useEffect(() => {
        chrome.storage.sync.get().then((data) => {
            reset(data as DataFormat);
        });
        getTab().then((tab) => {
            setDomain(getDomain(tab.url));
        });
    }, []);
    chrome.storage.sync.get().then((data) => {
        const options = data["options"] as DataFormat["options"];
        if (options) {
            for (const [key, value] of Object.entries(options)) {
                const element = document.getElementById(key) as HTMLInputElement;
                element.checked = value;
            }
        }
    });
    const removeExclusion = async () => {
        const exceptions = getValues("exceptions");
        const index = exceptions.indexOf(domain);
        if (index !== -1) {
            const new_exceptions = [...exceptions];
            new_exceptions.splice(index, 1);
            setValue("exceptions", new_exceptions, {
                shouldTouch: true,
                shouldDirty: true,
            });
        }
    };
    const addExclusion = async () => {
        const exceptions = getValues("exceptions");
        if (!exceptions.includes(domain)) {
            exceptions.push(domain);
            const new_exceptions = [...exceptions, domain];
            setValue("exceptions", new_exceptions, {
                shouldTouch: true,
                shouldDirty: true,
            });

        }
    }
    const startHere = async () => {
        await start(await getTab());
    };
    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={2} component="form">
            <Typography level="h1" fontSize="xxl">Clean page</Typography>
            <Grid container spacing={2} flexDirection="column" alignItems="center" p={2}>
                <Grid>
                    <Button id="buttonNow" onClick={startHere}>Clean this page now</Button>
                </Grid>
                <Grid>
                    <Controller
                        name="autoStart"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={field.value}
                                onChange={field.onChange}
                                label="Clean pages automatically"
                            />
                        )}
                    />
                </Grid>
                <Grid>
                    <Controller
                        name="exceptions"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={field.value?.includes(domain) ?? false}
                                onChange={async (e) => {
                                    if (e.target.checked)
                                        await addExclusion()
                                    else
                                        await removeExclusion()
                                }}
                                label="Exclude this website from autocleaning"
                            />
                        )}
                    />
                </Grid>
                <Grid>
                    <Controller
                        name="options.colors"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={field.value}
                                onChange={field.onChange}
                                label="Change colors?"
                            />
                        )}
                    />
                </Grid>
                <Grid>
                    <Controller
                        name="options.fonts"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={field.value}
                                onChange={field.onChange}
                                label="Change fonts?"
                            />
                        )}
                    />
                </Grid>
                <Grid>
                    <Controller
                        name="options.sizes"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={field.value}
                                onChange={field.onChange}
                                label="Change sizes?"
                            />
                        )}
                    />
                </Grid>
                <Grid>
                    <Controller
                        name="options.spacing"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={field.value}
                                onChange={field.onChange}
                                label="Change spacing?"
                            />
                        )}
                    />
                </Grid>
                <Grid>
                    <Controller
                        name="options.autoplay"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={field.value}
                                onChange={field.onChange}
                                label="Stop autoplay & animations?"
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
