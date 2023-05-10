import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface BreakpointOverrides {
        desktop: true;
        lg: false;
        md: false;
        mobile: true;
        sm: false;
        xl: false;
        xs: false;
    }
}

export const theme = createTheme({
	breakpoints: {
		values: {
			desktop: 850,
			mobile: 0
		}
	},
	palette: {
		background: {
			default: "#E2E0E8"
		},
		primary: {
			main: "#400072",
			light: "#E2E0E8"
		},
		secondary: {
			main: "#F6F6F6",
			dark: "#000000"
		}, divider: "#B09DC0"
	}
	,
	typography: {
		fontFamily: "PT Sans",
		body1: {
			fontFamily: "PT Sans",
			fontSize: "16px",
			fontWeight: 300,
		},
		body2: {
			fontFamily: "PT Sans",
			fontSize: "16px",
			fontWeight: 400,
		},
		h1: {
			fontFamily: "PT Sans",
			fontSize: "28px",
			fontWeight: 600
		},
		h2: {
			fontFamily: "PT Sans",
			fontSize: "24px",
			fontWeight: 600
		},
		h3: {
			fontFamily: "PT Sans",
			fontSize: "20px",
			fontWeight: 600
		},
		h4: {
			fontFamily: "PT Sans",
			fontSize: "16px",
			fontWeight: 600
		},
		h5: {
			fontFamily: "PT Sans",
			fontSize: "12px",
			fontWeight: 600
		},
		h6: {
			fontFamily: "PT Sans",
			fontSize: "8px",
			fontWeight: 600
		},
		subtitle1: {
			fontFamily: "PT Sans",
			fontSize: "18px",
			fontWeight: 400
		},
		subtitle2: {
			fontFamily: "PT Sans",
			fontSize: "16px",
			fontWeight: 400
		},
		button: {
			fontFamily: "PT Sans",
			fontSize: "15px",
			fontWeight: 600,
			textTransform: "none"
		}
	}
});