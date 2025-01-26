import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, Text, Button, Group, Box } from "@mantine/core";
import { FaTrash } from "react-icons/fa";

const CardUI = ({ id, title, avatarUrl, profileUrl, onDelete }) => {
	const [flipped, setFlipped] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			whileHover={{ scale: 1.03 }}
			style={{
				perspective: "1000px",
				width: "300px",
				margin: "20px auto",
			}}
		>
			<motion.div
				style={{
					transformStyle: "preserve-3d",
					transition: "transform 0.6s",
					transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
				}}
				onClick={() => setFlipped((prev) => !prev)}
			>
				{/* Front Side */}
				<Card
					shadow="md"
					radius="lg"
					style={{
						width: "100%",
						height: "300px",
						position: "relative",
						backfaceVisibility: "hidden",
						backgroundColor: "#0d1117",
						color: "#c9d1d9",
						border: "1px solid #21262d",
					}}
				>
					<Card.Section style={{ height: "160px", overflow: "hidden" }}>
						<img
							src={avatarUrl}
							alt={`${title}'s avatar`}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
							}}
						/>
					</Card.Section>
					<Box mt="md">
						<Text size="lg" weight={500} style={{ color: "#58a6ff" }}>
							{title}
						</Text>
						<Text size="sm" color="dimmed">
							GitHub User
						</Text>
					</Box>
				</Card>

				{/* Back Side */}
				<Card
					shadow="md"
					radius="lg"
					style={{
						width: "100%",
						height: "300px",
						position: "absolute",
						top: "0",
						left: "0",
						backfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
						backgroundColor: "#161b22", // Slightly lighter dark mode color
						color: "#c9d1d9",
						border: "1px solid #21262d",
					}}
				>
					<Text size="md" weight={600} style={{ marginBottom: "10px", textAlign: "center", color: "#58a6ff" }}>
						Additional Info
					</Text>
					<Text size="sm" style={{ marginBottom: "10px" }}>
						Followers URL:{" "}
						<a href={profileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#58a6ff" }}>
							View Followers
						</a>
					</Text>
					<Text size="sm" style={{ marginBottom: "10px" }}>
						Following URL:{" "}
						<a href={profileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#58a6ff" }}>
							View Following
						</a>
					</Text>
					<Group position="center" mt="md">
						<Button
							variant="outline"
							color="red"
							onClick={(e) => {
								e.stopPropagation();
								onDelete(id);
							}}
							style={{
								borderColor: "#da3633", // GitHub red danger color
								color: "#da3633",
							}}
						>
							<FaTrash style={{ marginRight: "5px" }} /> Delete
						</Button>
					</Group>
				</Card>
			</motion.div>
		</motion.div>
	);
};

export default CardUI;
