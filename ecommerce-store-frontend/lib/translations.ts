export const translations = {
  sq: {
    // Navigation
    nav: {
      home: 'Ballina',
      products: 'Produktet',
      categories: 'Kategoritë',
      cart: 'Shporta',
      wishlist: 'Lista e Dëshirave',
      login: 'Hyr',
      register: 'Regjistrohu',
      logout: 'Dil',
      dashboard: 'Paneli',
      admin: 'Administrimi',
      profile: 'Profili',
      addresses: 'Adresat',
      orders: 'Porositë',
      search: 'Kërko...',
    },

    // Home Page
    home: {
      title: 'Mirë se vini në Dyqanin Tonë',
      subtitle: 'Zbuloni produktet më të mira me çmime të shkëlqyera',
      shopNow: 'Blej Tani',
      featuredProducts: 'Produktet e Zgjedhura',
      shopByCategory: 'Blerje sipas Kategorive',
      viewAll: 'Shiko të Gjitha',
      features: {
        shipping: {
          title: 'Dërgesa Falas',
          description: 'Dërgesa falas për porosi mbi €50',
        },
        returns: {
          title: 'Kthime të Lehta',
          description: 'Kthime 30-ditore pa mundim',
        },
        support: {
          title: 'Mbështetje 24/7',
          description: 'Kontaktoni ne çdo kohë që keni nevojë',
        },
        payment: {
          title: 'Pagesë e Sigurt',
          description: 'Transaksionet tuaja janë të sigurta',
        },
      },
    },

    // Products
    products: {
      title: 'Produktet',
      browseCollection: 'Shfletoni koleksionin tonë prej {count} produktesh të mrekullueshme',
      searchPlaceholder: 'Kërko produkte...',
      allCategories: 'Të Gjitha Kategoritë',
      sortBy: 'Rendit sipas',
      newest: 'Më të Rejat',
      priceLowToHigh: 'Çmimi: Ulët në Lartë',
      priceHighToLow: 'Çmimi: Lartë në Ulët',
      name: 'Emri',
      rating: 'Vlerësimi',
      minPrice: 'Çmimi Min',
      maxPrice: 'Çmimi Max',
      noProducts: 'Nuk u gjetën produkte',
      adjustFilters: 'Provoni të rregulloni filtrat ose termat e kërkimit',
      addToCart: 'Shto në Shportë',
      outOfStock: 'Jashtë Stokut',
      inStock: 'Në Stok',
      onlyLeft: 'Vetëm {count} kanë mbetur',
      save: 'Ruaj {percent}%',
      reviews: '{count} vlerësime',
    },

    // Product Detail
    productDetail: {
      availability: 'Disponueshmëria:',
      sku: 'SKU:',
      addToCart: 'Shto në Shportë',
      outOfStock: 'Jashtë Stokut',
      quantity: 'Sasia',
      customerReviews: 'Vlerësimet e Klientëve',
      writeReview: 'Shkruaj një Vlerësim',
      writeYourReview: 'Shkruani Vlerësimin Tuaj',
      rating: 'Vlerësimi',
      reviewTitle: 'Titulli i Vlerësimit (Opsionale)',
      reviewTitlePlaceholder: 'Përmbledhni vlerësimin tuaj',
      yourReview: 'Vlerësimi Juaj (Opsional)',
      reviewPlaceholder: 'Ndani mendimet tuaja për këtë produkt',
      submitReview: 'Dërgo Vlerësimin',
      submitting: 'Duke dërguar...',
      cancel: 'Anulo',
      noReviews: 'Ende pa vlerësime. Bëhuni i pari që vlerëson këtë produkt!',
      verifiedPurchase: 'Blerje e Verifikuar',
      stars: '{count} yll{plural}',
    },

    // Categories
    categories: {
      title: 'Blerje sipas Kategorive',
      browse: 'Shfletoni përzgjedhjen tonë të gjerë prej {count} kategorish',
      products: '{count} Produkt{plural}',
      subcategories: '{count} nënkategori',
      noCategories: 'Nuk ka kategori të disponueshme',
      checkLater: 'Kontrolloni më vonë për përditësime',
    },

    // Cart
    cart: {
      title: 'Shporta Juaj',
      items: '{count} artikuj',
      emptyCart: 'Shporta juaj është bosh',
      startShopping: 'Filloni Blerjen',
      continueShopping: 'Vazhdoni Blerjen',
      remove: 'Hiq',
      subtotal: 'Nëntotali',
      shipping: 'Dërgesa',
      tax: 'Taksa',
      total: 'Totali',
      proceedToCheckout: 'Vazhdo në Pagesë',
      updateQuantity: 'Përditëso Sasinë',
    },

    // Checkout
    checkout: {
      title: 'Pagesë',
      shippingAddress: 'Adresa e Dërgimit',
      selectAddress: 'Zgjidh Adresën',
      addNewAddress: 'Shto Adresë të Re',
      paymentMethod: 'Metoda e Pagesës',
      creditCard: 'Kartë Krediti',
      paypal: 'PayPal',
      cashOnDelivery: 'Pagesë me Para në Dorëzim',
      orderSummary: 'Përmbledhja e Porosisë',
      placeOrder: 'Bëj Porosinë',
      processing: 'Duke përpunuar...',
    },

    // Dashboard
    dashboard: {
      title: 'Paneli Im',
      totalOrders: 'Porositë Totale',
      myProfile: 'Profili Im',
      addresses: 'Adresat',
      manageAddresses: 'Menaxho adresat',
      recentOrders: 'Porositë e Fundit',
      noOrders: 'Ende nuk keni bërë asnjë porosi',
      startShopping: 'Filloni Blerjen',
      orderNumber: 'Numri i Porosisë',
      orderDate: 'Data e Porosisë',
      status: 'Statusi',
      items: 'artikuj',
    },

    // Orders
    orders: {
      title: 'Detajet e Porosisë',
      orderNumber: 'Porosia {number}',
      status: 'Statusi',
      orderedOn: 'Porositur më {date}',
      deliveredOn: 'Dorëzuar më {date}',
      orderItems: 'Artikujt e Porosisë',
      quantity: 'Sasia: {count}',
      each: '{price} secili',
      shippingAddress: 'Adresa e Dërgimit',
      paymentSummary: 'Përmbledhja e Pagesës',
      paymentMethod: 'Metoda e Pagesës: {method}',
      paymentStatus: 'Statusi i Pagesës: {status}',
      notFound: 'Porosia Nuk u Gjet',
      notFoundMessage: 'Porosia që kërkoni nuk ekziston',
      backToDashboard: 'Kthehu në Panel',
      statusValues: {
        pending: 'Në Pritje',
        processing: 'Duke u Përpunuar',
        shipped: 'Dërguar',
        delivered: 'Dorëzuar',
        cancelled: 'Anuluar',
      },
    },

    // Wishlist
    wishlist: {
      title: 'Lista ime e Dëshirave',
      itemsSaved: '{count} {item} të ruajtura',
      item: 'artikull',
      items: 'artikuj',
      clearAll: 'Pastro të Gjitha',
      confirmClear: 'Jeni i sigurt që dëshironi të pastroni listën tuaj të dëshirave?',
      emptyWishlist: 'Lista juaj e dëshirave është bosh',
      emptyMessage: 'Ruani artikujt që ju pëlqejnë duke klikuar në ikonën e zemrës në faqet e produkteve',
      browseProducts: 'Shfletoni Produktet',
      addedToWishlist: 'Shtuar në listën e dëshirave',
      removedFromWishlist: 'Hequr nga lista e dëshirave',
      moveToCart: 'Lëviz në Shportë',
    },

    // Profile
    profile: {
      title: 'Cilësimet e Profilit',
      personalInfo: 'Informacioni Personal',
      firstName: 'Emri',
      lastName: 'Mbiemri',
      email: 'Email',
      phoneNumber: 'Numri i Telefonit',
      updateProfile: 'Përditëso Profilin',
      changePassword: 'Ndrysho Fjalëkalimin',
      currentPassword: 'Fjalëkalimi Aktual',
      newPassword: 'Fjalëkalimi i Ri',
      confirmPassword: 'Konfirmo Fjalëkalimin',
      passwordsDoNotMatch: 'Fjalëkalimet nuk përputhen',
      profileUpdated: 'Profili u përditësua me sukses',
      passwordChanged: 'Fjalëkalimi u ndryshua me sukses',
    },

    // Addresses
    addresses: {
      title: 'Adresat e Mia',
      addAddress: 'Shto Adresë',
      editAddress: 'Ndrysho Adresën',
      addNewAddress: 'Shto Adresë të Re',
      firstName: 'Emri',
      lastName: 'Mbiemri',
      addressLine1: 'Adresa Rreshti 1',
      addressLine2: 'Adresa Rreshti 2',
      city: 'Qyteti',
      state: 'Shteti/Rajoni',
      postalCode: 'Kodi Postar',
      country: 'Shteti',
      phoneNumber: 'Numri i Telefonit',
      setDefault: 'Vendos si adresë të paracaktuar',
      default: 'E Paracaktuar',
      noAddresses: 'Ende pa adresa të ruajtura',
      addAddressToStart: 'Shtoni një adresë për të filluar',
      deleteConfirm: 'Jeni i sigurt që dëshironi të fshini këtë adresë?',
      addressDeleted: 'Adresa u fshi me sukses',
      addressUpdated: 'Adresa u përditësua me sukses',
      addressAdded: 'Adresa u shtua me sukses',
    },

    // Admin
    admin: {
      title: 'Paneli i Administrimit',
      welcome: 'Mirë se vini, Administrator',
      totalProducts: 'Produktet Totale',
      totalCategories: 'Kategoritë Totale',
      totalOrders: 'Porositë Totale',
      products: 'Produktet',
      categories: 'Kategoritë',
      orders: 'Porositë',
      manageProducts: 'Menaxho Produktet',
      manageCategories: 'Menaxho Kategoritë',
      manageOrders: 'Menaxho Porositë',
      addProduct: 'Shto Produkt',
      editProduct: 'Ndrysho Produktin',
      deleteProduct: 'Fshi Produktin',
      addCategory: 'Shto Kategori',
      editCategory: 'Ndrysho Kategorinë',
      deleteCategory: 'Fshi Kategorinë',
      productName: 'Emri i Produktit',
      description: 'Përshkrimi',
      price: 'Çmimi',
      comparePrice: 'Çmimi Krahasues',
      stock: 'Stoku',
      category: 'Kategoria',
      mainImage: 'Imazhi Kryesor (URL)',
      featured: 'I Zgjedhur',
      save: 'Ruaj',
      cancel: 'Anulo',
      deleteConfirm: 'Jeni i sigurt që dëshironi të fshini këtë artikull?',
      productDeleted: 'Produkti u fshi me sukses',
      productUpdated: 'Produkti u përditësua me sukses',
      productAdded: 'Produkti u shtua me sukses',
      categoryDeleted: 'Kategoria u fshi me sukses',
      categoryUpdated: 'Kategoria u përditësua me sukses',
      categoryAdded: 'Kategoria u shtua me sukses',
      updateOrderStatus: 'Përditëso Statusin e Porosisë',
      orderStatusUpdated: 'Statusi i porosisë u përditësua',
    },

    // Auth
    auth: {
      login: 'Hyrje',
      register: 'Regjistrohu',
      email: 'Email',
      password: 'Fjalëkalimi',
      confirmPassword: 'Konfirmo Fjalëkalimin',
      firstName: 'Emri',
      lastName: 'Mbiemri',
      forgotPassword: 'Harruat fjalëkalimin?',
      noAccount: 'Nuk keni llogari?',
      haveAccount: 'Keni tashmë llogari?',
      signIn: 'Hyr',
      signUp: 'Regjistrohu',
      loginSuccess: 'U identifikuat me sukses',
      registerSuccess: 'U regjistruat me sukses',
      loginError: 'Email ose fjalëkalim i gabuar',
      registerError: 'Regjistrimi dështoi',
    },

    // Common
    common: {
      loading: 'Duke u ngarkuar...',
      error: 'Gabim',
      success: 'Sukses',
      close: 'Mbyll',
      save: 'Ruaj',
      cancel: 'Anulo',
      delete: 'Fshi',
      edit: 'Ndrysho',
      add: 'Shto',
      remove: 'Hiq',
      update: 'Përditëso',
      search: 'Kërko',
      filter: 'Filtro',
      sort: 'Rendit',
      apply: 'Apliko',
      clear: 'Pastro',
      submit: 'Dërgo',
      back: 'Kthehu',
      next: 'Tjetra',
      previous: 'E mëparshme',
      confirmDelete: 'Jeni i sigurt që dëshironi ta fshini?',
      yes: 'Po',
      no: 'Jo',
      ok: 'OK',
      addedToCart: 'Shtuar në shportë',
      failedToAddToCart: 'Dështoi shtimi në shportë',
    },

    // Toast Messages
    toast: {
      addedToCart: '{product} u shtua në shportën tuaj',
      addedToWishlist: '{product} u shtua në listën tuaj të dëshirave',
      removedFromWishlist: '{product} u hoq nga lista juaj e dëshirave',
      reviewSubmitted: 'Faleminderit për vlerësimin tuaj!',
      profileUpdated: 'Profili u përditësua me sukses',
      passwordChanged: 'Fjalëkalimi u ndryshua me sukses',
      addressAdded: 'Adresa u shtua me sukses',
      addressUpdated: 'Adresa u përditësua me sukses',
      addressDeleted: 'Adresa u fshi me sukses',
      wishlistCleared: 'Të gjithë artikujt u hoqën nga lista juaj e dëshirave',
      error: 'Diçka shkoi keq',
    },
  },
};

export type Language = 'sq';

export function t(key: string, params?: Record<string, string | number>): string {
  const lang: Language = 'sq';
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }

  if (typeof value === 'string' && params) {
    return value.replace(/\{(\w+)\}/g, (match, param) => {
      return params[param]?.toString() || match;
    });
  }

  return typeof value === 'string' ? value : key;
}
