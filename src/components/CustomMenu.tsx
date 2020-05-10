import React, { useContext } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { TokenContext } from "contexts/tokenContext";
import jwtDecoder from "jwt-decode";
import { decodedToken } from "interfaces/tokenInterface";
import useAuth from "hooks/useAuth";

interface customMenuProps {
	token: string | undefined;
}

const CustomMenu: React.FunctionComponent<customMenuProps> = ({ token }) => {
	const { dispatch } = useContext(TokenContext);
	const { level, name } = useAuth();
	const handleLogoutClick = () => {
		localStorage.removeItem("token");
		dispatch({ type: "REMOVE_TOKEN", token: "" });
	};
	if (token) {
		return (
			<>
				<Dropdown item text="Alumni">
					<Dropdown.Menu>
						{level == 0 ? (
							<Dropdown.Item as={Link} to="/addAlumni">
								Tambah Alumni
							</Dropdown.Item>
						) : null}
						<Dropdown.Item as={Link} to="/alumni">
							Lihat Daftar Alumni
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<Dropdown item text="Jurusan">
					<Dropdown.Menu>
						{level == 0 ? (
							<Dropdown.Item as={Link} to="/addMajor">
								Tambah Jurusan
							</Dropdown.Item>
						) : null}
						<Dropdown.Item as={Link} to="/majors">
							Lihat Daftar Jurusan
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<Menu.Menu position="right">
					<Dropdown item text={name}>
						<Dropdown.Menu>
							<Dropdown.Item
								as={Link}
								to="/login"
								onClick={() => handleLogoutClick()}
							>
								Keluar
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Menu>
			</>
		);
	} else {
		return (
			<Menu.Menu position="right">
				<Menu.Item as={Link} to="/login">
					Masuk
				</Menu.Item>
				<Menu.Item as={Link} to="/register">
					Daftar
				</Menu.Item>
			</Menu.Menu>
		);
	}
};

export default CustomMenu;
