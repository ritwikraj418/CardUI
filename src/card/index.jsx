import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";

const Card = () => {
	const [users, setUsers] = useState([]);
	const [deleteUserId, setDeleteUserId] = useState(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	// Fetch GitHub users from API on component mount
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch("https://api.github.com/users");
				const data = await response.json();
				setUsers(data.slice(0, 30)); // Limit to 30 users
			} catch (error) {
				console.error("Error fetching GitHub users:", error);
			}
		};

		fetchUsers();
	}, []);

	// Handle delete: Remove a card by its ID
	const handleDelete = () => {
		setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteUserId));
		setIsDeleteModalOpen(false);
	};

	// Open the delete confirmation modal
	const openDeleteModal = (id) => {
		setDeleteUserId(id);
		setIsDeleteModalOpen(true);
	};

	// Handle adding a new user
	const handleAddUser = () => {
		const newUser = {
			id: Date.now(),
			login: "new_user",
			avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
			html_url: "https://github.com/new_user",
			type: "User",
			user_view_type: "public",
			url: "https://api.github.com/users/new_user",
		};
		setUsers((prevUsers) => [newUser, ...prevUsers]);
	};

	return (
		<div style={{ padding: "20px", background: "#f3f4f6", minHeight: "100vh" }}>
			{/* Header with title and add button */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "20px",
				}}
			>
				<h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>
					GitHub User Cards
				</h1>
				<button
					style={{
						display: "flex",
						alignItems: "center",
						background: "#2563eb",
						color: "#fff",
						borderRadius: "12px",
						padding: "10px 15px",
						border: "none",
						cursor: "pointer",
						transition: "background 0.3s",
					}}
					onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
					onMouseOut={(e) => (e.target.style.background = "#2563eb")}
					onClick={handleAddUser}
				>
					<FaPlus style={{ marginRight: "8px" }} />
					Add User
				</button>
			</div>

			{/* Delete Confirmation Modal */}
			{isDeleteModalOpen && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						background: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 1000,
					}}
				>
					<div
						style={{
							background: "#fff",
							borderRadius: "12px",
							padding: "20px",
							width: "400px",
							boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
						}}
					>
						<h2 style={{ marginBottom: "16px", color: "#1f2937" }}>Confirm Deletion</h2>
						<p>Are you sure you want to delete this user?</p>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-end",
								gap: "10px",
								marginTop: "20px",
							}}
						>
							<button
								onClick={() => setIsDeleteModalOpen(false)}
								style={{
									background: "#e5e7eb",
									color: "#333",
									padding: "8px 16px",
									borderRadius: "8px",
									border: "none",
									cursor: "pointer",
								}}
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								style={{
									background: "#ef4444",
									color: "#fff",
									padding: "8px 16px",
									borderRadius: "8px",
									border: "none",
									cursor: "pointer",
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Card container */}
			<motion.div
				layout
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
					gap: "20px",
				}}
			>
				<AnimatePresence>
					{users.map((user) => (
						<motion.div
							key={user.id}
							layout
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							style={{
								background: "#fff",
								borderRadius: "16px",
								boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
								overflow: "hidden",
								position: "relative",
								padding: "20px",
								transition: "transform 0.3s",
								cursor: "pointer",
							}}
							whileHover={{ scale: 1.05 }}
						>
							<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
								<img
									src={user.avatar_url}
									alt={`${user.login}'s avatar`}
									style={{
										width: "80px",
										height: "80px",
										borderRadius: "50%",
										border: "2px solid #e5e7eb",
									}}
								/>
								<div>
									<h2
										style={{
											fontSize: "20px",
											margin: "0",
											color: "#1f2937",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{user.login}
									</h2>
									<a
										href={user.html_url}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											fontSize: "14px",
											color: "#2563eb",
											textDecoration: "none",
										}}
									>
										Visit Profile <FaExternalLinkAlt size={12} />
									</a>
									<p style={{ fontSize: "12px", margin: "8px 0", color: "#6b7280" }}>
										<span
											style={{
												background: "#d1fae5",
												color: "#065f46",
												padding: "2px 6px",
												borderRadius: "6px",
												marginRight: "8px",
											}}
										>
											{user.type}
										</span>
										<span
											style={{
												background: "#fef3c7",
												color: "#92400e",
												padding: "2px 6px",
												borderRadius: "6px",
											}}
										>
											{user.user_view_type}
										</span>
									</p>
									<p style={{ fontSize: "12px", color: "#4b5563" }}>API URL: {user.url}</p>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginTop: "16px",
								}}
							>
								<button
									onClick={() => openDeleteModal(user.id)}
									style={{
										background: "#ef4444",
										color: "#fff",
										border: "none",
										padding: "8px 12px",
										borderRadius: "8px",
										cursor: "pointer",
									}}
								>
									<FaTrashAlt /> Delete
								</button>
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>
		</div>
	);
};

export default Card;
