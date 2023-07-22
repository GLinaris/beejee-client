import { TextField } from "@mui/material";

export default function CustomTextField({ formik, name, label, disabled }) {

    return (
        <TextField
            error={Boolean(formik.touched[name] && formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            label={label}
            name={name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values[name]}
            disabled={disabled}
            fullWidth
            margin={"normal"}
        />
    );
}
