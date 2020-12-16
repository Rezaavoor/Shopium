import axios from 'axios'

export default async (req, res) => {
  if (req.method == 'POST') {
    const { token, searchWord, page } = req.body

    try {
      const traderaData = await fetchTradera(searchWord, page.page)
      const blocketData = await fetchBlocket(token, searchWord, page.page) //blocket requires a bearer token
      const shpockData = await fetchShpock(searchWord, page.od) //od is only for shpock
      const prisjaktData = await fetchPrisjakt(searchWord)
      res.statusCode = 200
      res.json({ traderaData, shpockData, blocketData, prisjaktData })
    } catch (e) {
      if (e.response.status == 401) {
        res.statusCode = 401
        res.json({
          authorize: { status: 'Could not find authentication method' },
        })
      } else {
        res.statusCode = 404
        res.json({
          error: e,
        })
      }
    }
  } else res.json({ error: 'bad request' })
}

const fetchTradera = async (searchWord, page = 1) => {
  searchWord = searchWord.replace(' ', '%20')
  const res = await axios.get(
    `https://www.tradera.com/search.json?q=${searchWord}&spage=${page}`
  )
  const items = res.data.items.slice(0, 40)
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
  const items = itemSearch.itemResults[0].items
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
  const items = res.data.data
  const next = page
  return { items, next }
}

const fetchPrisjakt = async (searchWord) => {
  const searchW = searchWord.replace(' ', '%20')
  const date = new Date().toISOString().split('T')[0]
  const res = await axios.get(
    `https://www.prisjakt.nu/_internal/graphql?release=${date}T12%3A30%3A27Z%7Cd6e7c2e0&main=search&variables=%7B%22id%22%3A%22search%22%2C%22query%22%3A%22${searchW}%22%2C%22sort%22%3A%22score%22%2C%22order%22%3A%22desc%22%2C%22offset%22%3A0%2C%22filters%22%3A%5B%7B%22id%22%3A%22category_id%22%2C%22selected%22%3A%5B%5D%7D%2C%7B%22id%22%3A%22brand_id%22%2C%22selected%22%3A%5B%5D%7D%2C%7B%22id%22%3A%22lowest_price%22%7D%2C%7B%22id%22%3A%22user_rating%22%7D%5D%2C%22productModes%22%3A%5B%22product%22%2C%22raw%22%5D%2C%22campaignId%22%3A4%2C%22personalizationClientId%22%3A%22%22%2C%22pulseEnvironmentId%22%3A%22sdrn%3Aschibsted%3Aenvironment%3Aundefined%22%7D`
  )
  const items = res.data.data.search.resources.products.nodes.slice(0, 5)
  return { items }
}
