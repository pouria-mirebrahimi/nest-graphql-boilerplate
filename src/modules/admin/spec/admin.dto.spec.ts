import { filterDto, getAdminOptions } from '../dto/admin.dto';

describe(`Admin module - ${getAdminOptions.name}`, () => {
  let adminOptions: getAdminOptions;

  beforeEach(() => {
    adminOptions = new getAdminOptions();
  });

  it('should be defined', () => {
    expect(adminOptions).toBeDefined();
  });

  it('should be instance of getAdminOptions', () => {
    expect(adminOptions).toBeInstanceOf(getAdminOptions);
  });

  it('should has an id field', () => {
    const id = 1;
    adminOptions.id = id;
    expect(adminOptions.id).toEqual(id);
  });

  it('should has a search field', () => {
    const filter: filterDto = {
      search: 'search',
      sorting: 'asc',
    };
    adminOptions.filter = filter;
    expect(adminOptions.filter).toEqual(filter);
  });
});
