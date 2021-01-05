import axios from 'axios'

export default async (req, res) => {
  if (req.method == 'POST') {
    const { token, searchWord, page } = req.body

    try {
      const allData = await Promise.all([
        fetchTradera(searchWord, page.page),
        fetchShpock(searchWord, page.od), //od is only for shpock
        fetchBlocket(token, searchWord, page.page), //blocket requires a bearer token
        fetchPricerunner(searchWord),
      ])
      res.statusCode = 200
      res.json({
        traderaData: allData[0],
        shpockData: allData[1],
        blocketData: allData[2],
        pricerunnerData: allData[3],
      })
    } catch (e) {
      if (e.response && e.response.status == 401) {
        res.statusCode = 401
        res.json({
          authorize: { status: 'Could not find authentication method' },
        })
      } else {
        res.statusCode = 404
        res.json({ error: e + '' })
      }
    }
  } else res.json({ error: 'bad request' })
}

const fetchTradera = async (searchWord, page = 1) => {
  searchWord = searchWord.replace(' ', '%20')
  const res = await axios.get(
    `https://www.tradera.com/search.json?q=${searchWord}&spage=${page}`
  )
  const items = res.data.items.slice(0, 40).map((i) => {
    return {
      id: i.itemId,
      origin: 'tradera',
      description: i.shortDescription ? i.shortDescription : '',
      price: i.price ? i.price : '',
      imageUrl: i.imageUrl ? i.imageUrl.replace('medium', 'images') : '',
      url: 'https://www.tradera.com' + i.itemUrl,
    }
  })
  const next = page + 1 //current page index + 1
  return { items, next }
}

const fetchShpock = async (searchWord, od = '') => {
  const res = await axios({
    method: 'post',
    url: 'https://www.shpock.com/graphql',
    headers: { 'content-type': 'application/json' },
    data: `{"operationName":"ItemSearch","variables":{"trackingSource":"Search","pagination":{"limit":40, "od": "${od}", "offset": 40},"serializedFilters":"{\\"q\\":\\"${searchWord}\\"}"},"query":"query ItemSearch($serializedFilters: String, $pagination: Pagination, $trackingSource: TrackingSource!) {\\n  itemSearch(serializedFilters: $serializedFilters, pagination: $pagination, trackingSource: $trackingSource) {\\n    __typename\\n    od\\n    offset\\n    limit\\n    count\\n    total\\n    adKeywords\\n    locality\\n    spotlightCarousel {\\n      ...carouselSummaryFragment\\n      __typename\\n    }\\n    itemResults {\\n      distanceGroup\\n      items {\\n        ...summaryFragment\\n        __typename\\n      }\\n      __typename\\n    }\\n    filters {\\n      __typename\\n      kind\\n      key\\n      triggerLabel\\n      serializedValue\\n      status\\n      ... on CascaderFilter {\\n        dataSourceKind\\n        __typename\\n      }\\n      ... on SingleSelectListFilter {\\n        title\\n        options {\\n          __typename\\n          label\\n          subLabel\\n          badgeLabel\\n          serializedValue\\n        }\\n        defaultSerializedValue\\n        __typename\\n      }\\n      ... on MultiSelectListFilter {\\n        title\\n        submitLabel\\n        options {\\n          __typename\\n          label\\n          subLabel\\n          badgeLabel\\n          serializedValue\\n        }\\n        __typename\\n      }\\n      ... on SearchableMultiSelectListFilter {\\n        title\\n        submitLabel\\n        searchEndpoint\\n        __typename\\n      }\\n      ... on RangeFilter {\\n        title\\n        __typename\\n      }\\n      ... on LegacyPriceFilter {\\n        title\\n        __typename\\n      }\\n      ... on LegacyLocationFilter {\\n        title\\n        __typename\\n      }\\n    }\\n  }\\n}\\n\\nfragment summaryFragment on Summary {\\n  __typename\\n  ... on ItemSummary {\\n    ...itemSummaryFragment\\n    __typename\\n  }\\n  ... on SelectionSummary {\\n    ...selectionSummaryFragment\\n    __typename\\n  }\\n  ... on ShopSummary {\\n    ...shopSummaryFragment\\n    __typename\\n  }\\n}\\n\\nfragment itemSummaryFragment on ItemSummary {\\n  id\\n  title\\n  media {\\n    id\\n    width\\n    height\\n    title\\n    __typename\\n  }\\n  description\\n  path\\n  distance\\n  distanceUnit\\n  locality\\n  price\\n  originalPrice\\n  currency\\n  ...itemSummaryTagsFragment\\n  canonicalURL\\n  pill {\\n    style\\n    iconId\\n    iconUrl\\n    label\\n    action\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment itemSummaryTagsFragment on ItemSummary {\\n  isNew\\n  isSold\\n  isFree\\n  isOnSale\\n  isLiked\\n  isBoosted\\n  isShippable\\n  isOnHold\\n  __typename\\n}\\n\\nfragment selectionSummaryFragment on SelectionSummary {\\n  __typename\\n  kind\\n  id\\n  title\\n  media {\\n    id\\n    width\\n    height\\n    title\\n    __typename\\n  }\\n  count\\n  theme\\n}\\n\\nfragment shopSummaryFragment on ShopSummary {\\n  __typename\\n  id\\n  name\\n  avatar {\\n    id\\n    __typename\\n  }\\n  media {\\n    id\\n    __typename\\n  }\\n  itemCount\\n}\\n\\nfragment carouselSummaryFragment on CarouselSummary {\\n  __typename\\n  label\\n  group\\n  items {\\n    id\\n    title\\n    description\\n    media {\\n      id\\n      width\\n      height\\n      title\\n      __typename\\n    }\\n    path\\n    price\\n    originalPrice\\n    currency\\n    ...itemSummaryTagsFragment\\n    canonicalURL\\n    __typename\\n  }\\n}\\n"}`,
  })
  const itemSearch = res.data.data.itemSearch
  const items = itemSearch.itemResults[0].items.map((i) => {
    return {
      id: i.id,
      origin: 'shpock',
      description: i.description ? i.description : '',
      price: i.price ? i.price : '',
      imageUrl: i.media
        ? `https://webimg.secondhandapp.com/w-i-mgl/${i.media[0].id}`
        : '',
      url: i.canonicalURL,
    }
  })
  const next = itemSearch.od
  return { items, next }
}

const fetchBlocket = async (token, searchWord, page) => {
  searchWord = searchWord.replace(' ', '%20')
  const res = await axios({
    method: 'get',
    url: `https://api.blocket.se/search_bff/v1/content?lim=40&q=${searchWord}&page=${
      page - 1
    }`,
    headers: { Authorization: token },
  })
  const items = res.data.data.map((i) => {
    return {
      id: i.ad_id,
      origin: 'blocket',
      description: i.subject ? i.subject : '',
      price: i.price ? i.price.value : '',
      imageUrl: i.images ? i.images[0].url + '?type=original' : '',
      url: i.share_url,
    }
  })
  const next = page
  return { items, next }
}

const fetchPricerunner = async (searchWord) => {
  const searchW = searchWord.replace(' ', '%20')
  const res = await axios.get(
    `https://www.pricerunner.se/public/search/v2/se?q=${searchW}`
  )
  const items = res.data.products.slice(0, 5).map((i) => {
    return {
      id: i.id,
      origin: 'pricerunner',
      description: i.name ? i.name : '',
      price: i.lowestPrice ? i.lowestPrice.amount : '',
      imageUrl: i.imageId
        ? `https://www.pricerunner.se/product/${i.imageId}`
        : '',
      url: 'https://www.pricerunner.se' + i.url,
    }
  })
  return { items }
}
