import { TipCursEnum, TipPrezentareCursEnum } from "./types/backend-data";

export const DataInRomana = (date: Date) => {
	const luni = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
	return `${date.getDate()} ${luni[date.getMonth()]} ${date.getFullYear()}`;
};

export const returnTipCursType = (BEResponse: TipCursEnum) => {
	switch (BEResponse) {
	case TipCursEnum.CURS:
		return "Curs";
	case TipCursEnum.LABORATOR:
		return "Laborator";
	default:
		return "";
	}
};

export const returnEnumTipCursType = (BEResponse: string) => {
	switch (BEResponse) {
	case "Curs":
		return TipCursEnum.CURS;
	case "Laborator":
		return TipCursEnum.LABORATOR;
	}
};

export const returnTipPrezentareCursType = (BEResponse: TipPrezentareCursEnum) => {
	switch (BEResponse) {
	case TipPrezentareCursEnum.FIZIC:
		return "fizic";
	case TipPrezentareCursEnum.HIBRID:
		return "hibrid";
	case TipPrezentareCursEnum.ONLINE:
		return "online";
	default:
		return "";
	}
};

export const returnEnumTipPrezentareCursType = (BEResponse: string) => {
	switch (BEResponse) {
	case "fizic":
		return TipPrezentareCursEnum.FIZIC;
	case "hibrid":
		return TipPrezentareCursEnum.HIBRID;
	case "online":
		return TipPrezentareCursEnum.ONLINE;
	}
};