import { CreateCard, updateCard } from "@interfaces/card.interface";
import { getWithExpiry } from "@utils/localstorage";

import { AxiosResponse, default as axios } from "axios";

const getCardByID = async (cardID: string): Promise<AxiosResponse> => {
	let headers = {
		Authorization: `Bearer ${getWithExpiry("token")}`,
	};

	const response = await axios.get(`/cards/${cardID}`, {
		method: "GET",
		headers: headers,
	});
	return response;
};
const createCard = async (cardData: CreateCard) => {
	const file = cardData.file;
	const fromData = new FormData();
	let headers = {
		"Content-Type": "multipart/form-data",
		Authorization: `Bearer ${getWithExpiry("token")}`,
	};
	if (file) {
		fromData.append("file", file);
	}
	console.log(cardData.deckID);

	fromData.append("cardName", cardData.cardName);
	fromData.append("cardMemo", cardData.cardMemo);
	fromData.append("deckID", cardData.deckID);

	const response = await axios.post<AxiosResponse>(`/cards`, cardData, {
		method: "POST",
		headers: headers,
	});
	return response;
};

const updateCard = async (cardData: updateCard): Promise<AxiosResponse> => {
	const file = cardData.file;
	const fromData = new FormData();
	let headers = {
		"Content-Type": "multipart/form-data",
		Authorization: `Bearer ${getWithExpiry("token")}`,
	};
	if (file) {
		fromData.append("file", file);
	}

	fromData.append("cardName", cardData.cardName);
	fromData.append("cardMemo", cardData.cardMemo);
	fromData.append("deckID", cardData.deckID);
	if (cardData.cardPic) {
		fromData.append("cardPic", cardData.cardPic);
	}

	const response = await axios.patch(`/cards/${cardData.cardID}`, cardData, {
		method: "PATCH",
		headers: headers,
	});
	return response;
};
const deleteCard = async (cardID: string) => {
	const response = await axios.delete<AxiosResponse>(`/cards/${cardID}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${getWithExpiry("token")}`,
		},
	});
	return response;
};

const randomCard = async (deckID: string, limit: number) => {
	const response = await axios.get(
		`/cards/random/${deckID}?limit=${limit}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${getWithExpiry("token")}`,
			},
		},
	);
	return response;
};

const CardService = {
	createCard,
	getCardByID,
	updateCard,
	deleteCard,
	randomCard,
};
export default CardService;
