
export interface ICategory {
    id: number;
    company_id: number;
    parent_id: number;
    image: string;
    status: number;
    sort_order: number;
    updated_at: string;
    created_at: string;
    file: IFile;
    //them vao doc du lieu 
    name: string;
    description: string;

}
export interface ICategories_lang {
    id: number;
    company_id: number;
    cat_id: number;
    lang_id: number;
    name: string;
    description: string;
}
export interface ICompany {
    id: number;
    name: string;
    domain: string;
    admin_domain: string;
    address: string;
    phone: string;
    type: number;
    status: number;
    ordering: number;
    created_at: string;
    updated_at: string;
    created_by: number;
    updated_by: number;
}
export interface IGroups {
    id: number;
    company_id: number;
    name: string;
}
export interface ILanguages {
    id: number;
    name: string;
    code: string;
    image: string;
    active: number;
    status: number;
}
export interface IMenu_lang {
    id: number;
    company_id: number;
    menu_id: number;
    lang_id: number;
    name: string;
}
export interface IMenu_type {
    id: number;
    company_id: number;
    name: string;
    status: number;
}
export interface IMenus {
    id: number;
    company_id: number;
    name: string;
    param: string;
    sort_order: number;
    is_right: number;
    is_search: number;
    cat_right: number;
    cat_right2: number;
    type: number;
    layout: number;
    parent_id: number;
    menu_type: number;
    status: number;
}
export interface INews {
    id: number;
    company_id: number;
    image: string;
    status: number;
    user_id: number;
    view: number;
    tags: string;
    icons: string;
    sort_order: number;
    object_type: number;
    file: string;
    updated_at: string;
    created_at: string;
    // them vao de doc data
    name: string;
    name_category: string;
}
export interface INew_categories {
    id: number;
    company_id: number;
    new_id: number;
    cat_id: number;
}
export interface INews_lang {
    id: number;
    company_id: number;
    news_id: number;
    lang_id: number;
    name: string;
    description: string;
    content: string;
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
}
export interface IPermissions {
    id: number;
    company_id: number;
    group_id: number;
    module: string;
    controller: string;
    action: string;
    role: number;
}
export interface ISite_config {
    id: number;
    company_id: number;
    name: string;
    description: string;
    logo: string;
    address: string;
    phone: string;
    email: string;
    facebook: string;
    twitter: string;
    google: string;
    contact_info: string;
    contact_info_bank: string;
    marquee: string;
    is_slidebar: number;
}
export interface Islideshow {
    id: number;
    company_id: number;
    name: string;
    description: string;
    image: string;
    link: string;
    status: number;
    slide_order: number;
    show_title: number;
    show_description: number;
}
export interface IUsers {
    id: number;
    company_id: number;
    fullname: string;
    username: string;
    avatar: string;
    gender: number;
    email: string;
    password: string;
    role_id: number;
    status: number;
    valid: number;
    confirmed: number;
    confirmation_code: string;
    created_at: string;
    updated_at: Date;
    remember_token: string;
    session_id: string;
    cookie_token: string;
    ip: string;
}









//////////////////////////////////
export interface IOrderChart {
    count: number;
    status:
    | "waiting"
    | "ready"
    | "on the way"
    | "delivered"
    | "could not be delivered";
}

export interface IOrderTotalCount {
    total: number;
    totalDelivered: number;
}

export interface ISalesChart {
    date: string;
    title: "Order Count" | "Order Amount";
    value: number;
}

export interface IOrderStatus {
    id: number;
    text: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
}

export interface IUser {
    id: number;
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone_number: string;
    address: string;
    status: boolean;
}

export interface IIdentity {
    id: number;
    name: string;
    avatar: string;
}

export interface IAddress {
    text: string;
    coordinate: [string, string];
}

export interface IFile {
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
}

export interface IEvent {
    // date: string;
    status: string;
}

export interface IStore {
    id: number;
    gsm: string;
    email: string;
    title: string;
    isActive: boolean;
    createdAt: string;
    address: IAddress;
    products: IProduct[];
}

export interface ICourier {
    id: number;
    name: string;
    surname: string;
    email: string;
    gender: string;
    gsm: string;
    createdAt: string;
    accountNumber: string;
    licensePlate: string;
    address: string;
    avatar: IFile[];
    store: IStore;
}
export interface IOrder {
    id: number;
    user: IUser;
    date: string;
    status: string;
    address: IAddress;
    payment: string;
    note: string;
    price: number;
    quantity: number;
    events: IEvent[];
}

export interface IProduct {
    id: number;
    food_name: string;
    quantity: number;
    description: string;
    image: string;
    discount: number;
    price: number;
    category: ICategory;
    star: number;
}
export interface Iorderdetail {
    id: number;
    food: IProduct;
    order: IOrder;
}

export interface IOrderFilterVariables {
    q?: string;
    store?: string;
    user?: string;
    status?: string[];
}

export interface IUserFilterVariables {
    q: string;
    status: boolean;
    gender: string;
    isActive: boolean | string;
}

export interface ICourier {
    id: number;
    name: string;
    surname: string;
    gender: string;
    gsm: string;
    createdAt: string;
    isActive: boolean;
    avatar: IFile[];
}

export interface IReview {
    id: number;
    order: IOrder;
    user: IUser;
    star: number;
    createDate: string;
    status: "pending" | "approved" | "rejected";
    comment: string[];
}

export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};
