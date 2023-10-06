

class CategoryMapper {

	toDomain(persistenceCategory: { id: string | undefined, name: string | undefined }) {
		return {
			id: persistenceCategory.id,
			name: persistenceCategory.name
		};
	}


}

export default new CategoryMapper();
