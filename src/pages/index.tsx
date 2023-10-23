import { GetServerSideProps } from "next";

import Home from "@/components/Home";

import ContactsService from "@/services/ContactsService";
interface ContactsProps {
  id: string,
  name: string,
  email: string,
  phone: string,
  category: {
    id: string | undefined,
    name: string | undefined,
  }
}

interface HomeProps {
  contactsDb: ContactsProps[],
  err: boolean
}


export default function Main({ contactsDb, err }: HomeProps) {

	return (
		<Home
			contactsDb={contactsDb}
			err={err}
		/>
	);

}




export const getServerSideProps: GetServerSideProps = async () => {

	let contactsDb: ContactsProps[];
	let err;


	try {
		contactsDb = await ContactsService.listContacts();
		err = false;

	} catch (error) {

		contactsDb = [];
		err = true;
	}


	return {
		props: {
			contactsDb,
			err
		},
	};

};
