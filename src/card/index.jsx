import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import CardUI from "./Cardui";
import { Box, Button, Text, Group, Modal } from "@mantine/core";
const Card = () => {
	const [users, setUsers] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Fetch GitHub users from API
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("https://api.github.com/users");
				setUsers(response.data.slice(0, 9)); // Limit to 9 users
			} catch (error) {
				console.error("Error fetching GitHub users:", error);
			}
		};
		fetchUsers();
	}, []);

	// Add a new hardcoded user
	const handleAdd = () => {
		const newUser = {
			id: Date.now(),
			login: `NewUser${users.length + 1}`,
			avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
			html_url: "https://github.com/NewUser",
		};
		setUsers((prevUsers) => [newUser, ...prevUsers]);
	};

	// Open delete confirmation modal
	const openDeleteModal = (id) => {
		setSelectedUserId(id);
		setIsModalOpen(true);
	};

	// Confirm delete
	const handleDelete = () => {
		setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUserId));
		setIsModalOpen(false);
		setSelectedUserId(null);
	};

	return (
		<Box style={{ padding: "20px", minHeight: "100vh" }}>
			{/* Header */}
			<Group position="apart">
				<Text size="xl" weight={700} style={{ alignItems: "center" }}>
					GitHub User Cards
				</Text>
				<Button
					onClick={handleAdd}
					variant="outline"
					color="red"
					leftIcon={<FaPlus />}
				>
					Add User
				</Button>
			</Group>

			{/* Cards */}
			<motion.div
				layout
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
					gap: "20px",
				}}
			>
				<AnimatePresence>
					{users.map((user) => (
						<CardUI
							key={user.id}
							id={user.id}
							title={user.login}
							avatarUrl={user.avatar_url}
							profileUrl={user.html_url}
							onDelete={openDeleteModal}
						/>
					))}
				</AnimatePresence>
			</motion.div>

			{/* Confirmation Modal */}
			<Modal
				opened={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Confirm Delete"
				centered
			>
				<Text size="sm">Are you sure you want to delete this user?</Text>
				<Group position="apart" mt="md">
					<Button variant="outline" color="gray" onClick={() => setIsModalOpen(false)}>
						Cancel
					</Button>
					<Button color="red" onClick={handleDelete}>
						Delete
					</Button>
				</Group>
			</Modal>
		</Box>
	);
};

export default Card;
