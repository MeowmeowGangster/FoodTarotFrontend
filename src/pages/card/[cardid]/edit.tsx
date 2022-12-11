import {
	Container,
	Stack,
	Grid,
	Button,
	Typography,
	TextareaAutosize,
} from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { cardById } from "@redux/selectors/card.selector";
import { getCardByID, UpdateCard } from "@redux/actions/card";
import Loading from "@components/loading";
import Success from "@components/lottie/success.json";
import { CardData, updateCard } from "@interfaces/card.interface";

const EditCardPage: NextPage = () => {
	const router = useRouter();
	const dispatch = useDispatch<any>();
	const { cardid } = router.query;
	const [cardStatus, setCardStatus] = useState("idle");

	const [cardName, setCardName] = useState<string>("");
	const [memo, setMemo] = useState<string>("");

	
	useEffect(() => {
		setCardStatus("loading");
		if (cardStatus === "loading") {
			dispatch(getCardByID(cardid as string));
		}
	}, [cardStatus, cardid, dispatch]);
	const cardState = useSelector(cardById);
	const [isUploading, setIsUploading] = useState(false);
	const [imageFile, setImageFile] = useState<File>();

	const cardimageRef = useRef<HTMLInputElement>(null);
	const onImageChange = () => {
		const files = cardimageRef.current?.files;
		if (files) {
			setImageFile(files[0]);
		}
	};

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (imageFile) {
			const data: updateCard = {
				cardID: cardState?.cardID as string,
				cardName: cardState?.cardName as string,
				deckID: cardState?.deckID as string,
				cardMemo: memo,
				file: imageFile,
				cardPic: undefined,
			};
			await dispatch(UpdateCard(data));
		} else {
			const data: updateCard = {
				cardID: cardState?.cardID as string,
				cardName: cardName,
				deckID: cardState?.deckID as string,
				cardMemo: memo,
				cardPic: cardState?.cardPic as string,
				file: undefined,
			};
			await dispatch(UpdateCard(data));
		}
		setIsUploading(true);

		router.push(`/deck/${cardState?.deckID}`);
		setIsUploading(false);
	};

	return (
		<div className="bg">
			{isUploading ? (
				<Loading animationData={Success} />
			) : (
				<Container>
					<Stack
						direction="row"
						style={{
							color: "white",
							fontFamily: "Prompt",
							justifyContent: "center",
							marginBottom: "-20px",
						}}
					>
						<h1>EDIT CARD</h1>
					</Stack>
					<Stack
						rowGap={5}
						style={{
							padding: "10px",
							// height: "100vh",
							overflowY: "scroll",
							justifyContent: "center",
							alignContent: "center",
							fontFamily: "Prompt",
						}}
					>
						<form onSubmit={onSubmit}>
							<Container>
								<Stack>
									<Container
										style={{
											marginTop: "20px",
											width: "100%",
											height: "160px",
											color: "#000000",
											padding: "20px",
											backgroundColor: "#fde68a",
											borderRadius: "20px",
											border: "none",
											boxShadow: "10px 10px 20px -9px rgba(0,0,0,0.29)",
										}}
									>
										<Stack rowGap={5}>
											<Typography variant="h6" component="h2">
												Name Your Card
											</Typography>
											<TextareaAutosize
												name="cardName"
												onChange={(e) => {
													setCardName(e.target.value);
												}}
												value={cardName ? cardName : cardState?.cardName}
												placeholder="Card Name"
												defaultValue={cardState?.cardName}
												style={{
													width: "100%",
													padding: "10px",
													color: "#000000",
													height: "50px",
													backgroundColor: "#ffffff",
													borderRadius: "50px",
													border: "none",
													fontFamily: "Prompt",
													verticalAlign: "center",
												}}
											/>
										</Stack>
									</Container>
									<Container
										style={{
											marginTop: "20px",
											width: "100%",
											height: "120px",
											color: "#000000",
											fontFamily: "Prompt",
											fontSize: "1rem",
											backgroundColor: "#fde68a",
											borderRadius: "20px",
											padding: "20px",
											boxShadow: "10px 10px 20px -9px rgba(0,0,0,0.29)",
										}}
									>
										<Stack>
											<Typography variant="h6" component="h2">
												Picture
											</Typography>
											<label>
												<div>
													<div
														style={{
															borderRadius: "20px",
															padding: "4%",
															backgroundColor: "white",
															maxHeight: "50px",
														}}
													>
														<Stack direction="row" spacing={2}>
															<div
																style={{
																	borderRadius: "10px",
																	minWidth: "40%",
																	maxHeight: "25px",
																	padding: "2px",
																	paddingLeft: "10px",
																	backgroundColor: "orange",
																	width: "40%",
																	fontFamily: "Prompt",
																	fontSize: "80%",
																	color: "white",
																}}
															>
																Select picture
															</div>
															<div
																style={{
																	fontFamily: "Prompt",
																	fontSize: "100%",
																	color: "black",
																	textOverflow: "ellipsis",
																	whiteSpace: "nowrap",
																	overflow: "hidden",
																}}
															>
																{imageFile?.name}
															</div>
														</Stack>
													</div>

													<span>
														<input
															type="file"
															ref={cardimageRef}
															onInput={onImageChange}
															style={{
																visibility: "hidden",
															}}
														/>
													</span>
												</div>
											</label>
										</Stack>
									</Container>
									<Container
										style={{
											marginTop: "20px",
											width: "100%",
											height: "200px",
											color: "#000000",

											backgroundColor: "#fde68a",
											borderRadius: "20px",
											padding: "20px",
											boxShadow: "10px 10px 20px -9px rgba(0,0,0,0.29)",
										}}
									>
										<Stack>
											<Typography variant="h6" component="h2">
												Memo
											</Typography>
											<TextareaAutosize
												name="cardMemo"
												defaultValue={cardState?.cardMemo}
												value={memo}
												placeholder="memo"
												style={{
													width: "100%",
													padding: "10px",
													color: "#000000",
													height: "100px",
													border: "none",
													backgroundColor: "#ffffff",
													borderRadius: "20px",
												}}
												onChange={(e: any) => setMemo(e.target.value)}
											/>
										</Stack>
									</Container>
								</Stack>
							</Container>
							<Stack
								style={{
									marginTop: "40px",
								}}
							>
								<Grid
									container
									spacing={12}
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Grid item xs={6}>
										<Button
											onClick={() => {
												router.back();
											}}
											style={{
												backgroundColor: "transparent",
												color: "white",
												borderRadius: "50px",
												padding: "10px 20px",
												fontFamily: "Prompt",
												width: "120px",
											}}
										>
											Delete
										</Button>
									</Grid>
									<Grid item xs={6}>
										<Button
											type="submit"
											style={{
												backgroundColor: "#fb923c",
												color: "white",
												borderRadius: "50px",
												padding: "10px 20px",
												fontFamily: "Prompt",
												width: "120px",
											}}
										>
											Save
										</Button>
									</Grid>
								</Grid>
							</Stack>
						</form>
					</Stack>
				</Container>
			)}
		</div>
	);
};

export default EditCardPage;