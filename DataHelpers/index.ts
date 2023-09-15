import { createClient } from '@/prismicio'
const client = createClient()
interface PrimaryObject {
  title: any[]
}

interface TitleText {
  text: string
  collection: any
}

interface UnsortedBrandsData {
  items: TitleText[]
  primary: PrimaryObject
}

// a generic object type that takes a key as a string
interface ObjectStringKeys {
  [key: string]: string
}

interface ReturnBrandsData {
  data: any
  titles: string[]
  id: string
  uiObject?: ObjectStringKeys[]
}

class RETURNBRANDSDATA {
  unSortedBrandsData: UnsortedBrandsData
  data: ObjectStringKeys
  titles: any[]
  id: string
  uiObject: ObjectStringKeys[]

  constructor(unSortedBrandsData: UnsortedBrandsData) {
    this.unSortedBrandsData = unSortedBrandsData
    this.data = {
      MenuTitle: unSortedBrandsData.primary.title[0].text,
      Handle: unSortedBrandsData.items[0].collection?.handle
        ? COLLECTION_URL + unSortedBrandsData.items[0].collection?.handle
        : '#',
    }
    this.titles = unSortedBrandsData.items.map((item) => item.text) as string[]
    this.titles = this.titles.filter((item) => !!item)
    this.id = this.titles[0]
    this.uiObject = unSortedBrandsData.items.map((item: any) => {
      return {
        text: item.text,
        handle: item.collection?.handle
          ? COLLECTION_URL + item.collection?.handle
          : '#',
      }
    })
    this.uiObject = this.uiObject.filter((item) => !!item.text)
  }

  get returnData(): ReturnBrandsData {
    return {
      data: this.data,
      titles: this.titles,
      id: this.id,
      uiObject: this.uiObject,
    }
  }
}

interface MenuDataObject {
  menutitle?: string
  MenuTitle?: string
  colour?: string
  linkonly: boolean
  linkonlymobile: boolean
  MenuLink: ObjectStringKeys
  link_to_collection: ObjectStringKeys
}

interface UnsortedMenuData {
  type?: string
  id: string
  data: MenuDataObject
}

class MENUDATA {
  unSortedMenuData: any
  menuTitle: string | undefined
  id: string
  href: string
  linkonly: boolean
  linkonlymobile: boolean

  constructor(unSortedMenuData: UnsortedMenuData) {
    this.unSortedMenuData = unSortedMenuData
    this.menuTitle =
      unSortedMenuData?.data.menutitle != null
        ? unSortedMenuData.data.menutitle
        : unSortedMenuData?.data.MenuTitle
    const { id, data } = unSortedMenuData
    this.id = id
    this.href =
      unSortedMenuData.data.MenuLink?.url ||
      (unSortedMenuData.data.link_to_collection?.handle
        ? COLLECTION_URL + unSortedMenuData.data.link_to_collection?.handle
        : '#')
    this.linkonly = data.linkonly
    this.linkonlymobile = data.linkonlymobile
  }

  get returnData(): any {
    if (this.linkonly != undefined) {
      return {
        id: this.id,
        data: {
          MenuTitle: this.menuTitle,
          linkonly: this.linkonly,
          linkonlymobile: this.linkonlymobile,
          href: this.href,
        },
      }
    }
    return {
      id: this.id,
      data: {
        MenuTitle: this.menuTitle,
        href: this.href,
      },
    }
  }
}

const returnAllBrands = async () => {
  const brandsMenuData = await client.getSingle('brandtest')
  const unSortedbrandsData: UnsortedBrandsData[] = brandsMenuData.data.slices
  const sortedBrandsData: ReturnBrandsData[] = unSortedbrandsData.map(
    (el: UnsortedBrandsData) => {
      const element = new RETURNBRANDSDATA(el)
      return element.returnData
    }
  )
  // ordered is the key from the front end to render the brand data
  return { ordered: sortedBrandsData }
}

const returnTopMenuData = async (
  menuString: string
): Promise<MenuDataObject[]> => {
  const menuData: any = await client.getSingle(menuString)
  return (
    (
      await Promise.all(
        menuData.data.SubMenuContents.map(
          async (item: any) => await client.getByID(item.SubMenu.id)
        )
      )
    )
      // @ts-ignore
      .map((item: UnsortedMenuData) => new MENUDATA(item).returnData)
  )
}

const returnShopMenuData = async (
  menuString: string
): Promise<MenuDataObject[]> => {
  const menuData: any = await client.getSingle(menuString)
  // @ts-ignore
  const s = (
    await Promise.all(
      menuData.data.SubMenuContents.map(
        async (item: any) => await client.getByID(item.SubMenu.id)
      )
    )
  ).filter(
    // @ts-ignore
    (item: UnsortedMenuData) =>
      item.type === 'MenuLevel2' && item.data.MenuTitle === 'SHOP'
  )
  const shopData = s.length > 0 ? s[0].data.SubMenuContents : []
  return (
    await Promise.all(
      shopData.map(async (item: any) => await client.getByID(item.SubMenu.id))
    )
  ).map((item: any) => new MENUDATA(item).returnData)
}

const normalizeNavItems = (arr: any[]) => {
  const navItems = arr.map((item: any) => ({
    collectionUrl:
      item.primary.Location?.url ||
      (item.primary.menu_item_collection_link?.handle
        ? COLLECTION_URL + item.primary.menu_item_collection_link.handle
        : '#'),
    collectionTitle: item.primary.title[0]?.text || '',
    isHighlight: item.primary.Highlight || false,
    items: item.items?.length
      ? item.items.map((subCollection: any) => ({
          subCollectionUrl:
            subCollection.location?.url ||
            (subCollection.sub_menu_item_collection_link?.handle
              ? COLLECTION_URL +
                subCollection.sub_menu_item_collection_link?.handle
              : '#'),
          subCollectionTitle: subCollection.Text[0]?.text || '',
          isHighlight: subCollection.Highlight || false,
        }))
      : item.items,
  }))
  return navItems
}

export const fetchMenuData = async (menuString: string) => {
  const brandsMenuData = await returnAllBrands()
  const topMenuData = await returnTopMenuData(menuString)
  const shopMenuData = await returnShopMenuData(menuString)

  return {
    topMenuData: topMenuData,
    shopMenuData: shopMenuData,
    brandsMenuData: brandsMenuData,
  }
}

export interface SubMenuData {
  id: string
  menutitle: string
  navigationLists?: []
  blogs?: []
  products?: []
  promotions?: []
  columnLists?: []
  linkOnlyDesktop?: boolean
  linkOnlyMobile?: boolean
  uiObject?: any
}

export enum SLICES {
  navigation = 'menu_navigation_item',
  blog = 'menu_feature_blog',
  product = 'menu_feature_product',
  promotion = 'menu_feature_promotion',
}

export const COLLECTION_URL = '/collections/'

export const fetchSubMenuData = async () => {
  let returnArray: SubMenuData[] = []
  const subMenuData: any = await client.getAllByType('SubMenuContent')
  for (let i = 0; i < subMenuData.length; i++) {
    const obj: SubMenuData = {
      menutitle: '',
      id: '',
    }
    if (subMenuData[i].data.products != null) {
    }
    const { menutitle, slices } = subMenuData[i].data
    obj['menutitle'] = menutitle
    // sort slices
    obj['navigationLists'] = slices.filter(
      (slice: any) => slice.slice_type == SLICES.navigation
    )
    if (obj['navigationLists']?.length) {
      ;(obj['navigationLists'] as any[]) = normalizeNavItems(
        obj['navigationLists']
      )
    }
    obj['blogs'] = slices.filter(
      (slice: any) => slice.slice_type == SLICES.blog
    )
    obj['products'] = slices.filter(
      (slice: any) => slice.slice_type == SLICES.product
    )
    obj['promotions'] = slices.filter(
      (slice: any) => slice.slice_type == SLICES.promotion
    )
    obj['id'] = subMenuData[i].id
    obj.linkOnlyDesktop = subMenuData[i].data.linkonly
    obj.linkOnlyMobile = subMenuData[i].data.linkonlymobile

    // request each blog by id if there is a link to the id
    if (obj['blogs'] && obj['blogs'].length > 0) {
      const returnBlogs: any = []
      const blogs: any[] = obj['blogs']
      for (const blog of blogs[0].items) {
        const serializedBlog: any = await client.getByID(blog.Blog.id)
        const obj = {
          href: serializedBlog.href,
          article_image: serializedBlog.data.article_image,
          title: serializedBlog.data.title,
          slug: '/blogs/news/' + serializedBlog.uid,
        }
        returnBlogs.push(obj)
      }
      obj['blogs'] = returnBlogs
    }
    returnArray.push(obj)
  }

  const bData: any = await returnAllBrands()
  returnArray.push(
    ...bData.ordered.map((el: any | undefined) => {
      return {
        uiObject: el.uiObject,
        menutitle: el.data.MenuTitle,
        id: el.id,
        columnLists: el.titles,
      }
    })
  )

  return { subMenuDisplayData: returnArray }
}
