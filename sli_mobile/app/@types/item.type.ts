export interface Item {
    Date: Date;
    BarcodePrice: number;
    BarcodeWeight: number;
    PosAddItem: boolean;
    LoyaltyPoints: number;
    CalculateLoyaltyFrom: number;
    GiftVoucher: boolean;
    IntrastatExcluded: boolean;
    CreateCustomerProductInCustomerPark: boolean;
    IsMaintenanceContract: boolean;
    IsGuaranteeExtension: boolean;
    CustomerParkCreation: number;
    StockBookingAllowed: boolean | number;
    AutomaticStockBooking: boolean;
    IncludeToRecursiveReplenishment: boolean;
    IncludeToFabricationReplenishment: boolean;
    IncludeToSupplierReplenishment: boolean;
    CadenceQuantity: number;
    CadenceNumberOfDays: number;
    DoNotAssortAssemblyRequestsWithDifferentDates: boolean;
    MaximumGapDayToAssort: number;
    NomenclatureAccountingTransferTypeForSale: number;
    NomenclatureAccountingTransferTypeForPurchase: number;
    VirtualPump: boolean;
    VirtualStockValue: number;
    BookedQuantity: number;
    PurchaseBillOfQuantitiesProgramKeepActiveFromQuoteToOrder: boolean;
    NotOnMarket: boolean;
    PurchaseUnitPriceProgramKeepActiveFromQuoteToOrder: boolean;
    CanBePartiallyDelivered: boolean;
    Caption: string;
    OxatisOxatisHandlingSurcharge1St: number;
    OxatisOxatisHandlingSurchargeOthers: number;
    InterventionDurationEqualsQuantity: boolean;
    Height: number;
    Width: number;
    Length: number;
    FamilyId: string;
    OxatisOxatisUseSubFamilyAsBrand: boolean;
    IsManagedByCounterMark: boolean;
    IsCounterMarkForced: boolean;
    SalePurchaseConversionRate: number;
    LimitDateMode: number;
    LimitDateSafetyDelay: number;
    UniqueId: string;
    PurchasePrice: number;
    ChargeRate: number;
    ChargeAmount: number;
    CostPrice: number;
    InterestRate: number;
    InterestAmount: number;
    SalePriceVatExcluded: number;
    BrandRate: number;
    VatAmount: number;
    SalePriceVatIncluded: number;
    ManageStock: boolean;
    RealStock: number;
    Pump: number;
    StockValue: number;
    OrderedQuantity: number;
    SuppliersOrderedQuantity: number;
    VirtualStock: number;
    DefaultQuantity: number;
    Volume: number;
    Weight: number;
    NetWeight: number;
    ComponentsPurchasePrice: number;
    ComponentsCostPrice: number;
    ComponentsSalePriceVatExcluded: number;
    ComponentsSalePriceVatIncluded: number;
    PrintComponentDetail: number;
    AssemblingVirtualQuantity: number;
    DisassemblingQuantity: number;
    QuantityUsedToAssemblate: number;
    QuantityFromDisassembling: number;
    AllowNegativeStock: boolean;
    UseComponentVat: boolean;
    ApplyPriceListOnComponents: boolean;
    ActiveState: number;
    AdvisedSalePriceVatExcluded: number;
    SetItemSalePriceWithAdvisedSalePrice: boolean;
    TrackingMode: number;
    AllowComponentsModification: boolean;
    AllowPublishOnWeb: boolean;
    ImageVersion: number;
    PriceDecimalNumber: number;
    IsHumanServicesIncludedInAttestation: boolean;
    OxatisOxatisShowInStockNote: boolean;
    OxatisOxatisShowStockLevel: boolean;
    OxatisOxatisShowIfOutOfStock: boolean;
    OxatisOxatisSaleIfOutOfStock: boolean;
    OxatisOxatisSaleIfOutOfStockScenario: number;
    OxatisOxatisShowDaysToShip: boolean;
    OxatisOxatisShipPrice: number;
    OxatisOxatisDaysToShip: number;
    OxatisOxatisUserMainSupplierDaysToShip: boolean;
    Id: string;
    ItemType: number;
    BillOfQuantitiesProgramKeepActiveFromQuoteToOrder: boolean;
    SaleUnitPriceProgramKeepActiveFromQuoteToOrder: boolean;
    UpdateComponentsStockInFabrication: boolean;
    CustomersDeliveryOrderPreparingQuantity: number;
    CustomersReturnOrderPreparingQuantity: number;
    SuppliersDeliveryOrderPreparingQuantity: number;
    SuppliersReturnOrderPreparingQuantity: number;
    StockBillOfQuantitiesProgramKeepActiveFromQuoteToOrder: boolean;
    PurchaseChargesRate: number;
    PosIsScale: boolean;
    PosTare: string | null;
    ReplenishmentDeliveryAddressType: number;
    ItemImage: string | null;
    DesCom: string;
    DesComClear: string;
    OxatisOxatisMetaTitle: string | null;
    OxatisOxatisMetaDescription: string | null;
    OxatisOxatisMetaKeywords: string | null;
    OxatisOxatisBrand: string | null;
    MainIntervener: string | null;
    IntrastatNc8NomenclatureId: string | null;
    Group1: string | null;
    Group2: string | null;
    NotPrintable: boolean | null;
    NotIncluded: boolean | null;
    IsFixedPrice: boolean | null;
    NonInvoiceableType: number | null;
    ComponentCalculationType: number | null;
    ReplacementItem: string | null;
    WeightUnitId: string | null;
    NumberOfItemByPackage: number;
    VolumeUnitId: string | null;
    SupplierId: string;
    EcotaxId: string | null;
    StockDestination: number;
    StockVarianceAccount: string;
    CurrentStockAccount: string;
    VatId: string;
    SysModuleId: string | null;
    SysDatabaseId: string | null;
    SysRecordVersion: number;
    SysRecordVersionId: string;
    SysEditCounter: number;
    LimitDateSafetyDelayMode: number | null;
    DefaultLifetime: number | null;
    PurchasePriceUpdateType: number | null;
    AnalyticAccountingGridId: string | null;
    PurchaseUnitId: string | null;
    DimensionUnitId: string | null;
    OxatisOxatisLongDescription: string | null;
    OxatisOxatisLongDescriptionClear: string | null;
    OxatisOxatisSmallImage: string | null;
    PurchaseBillOfQuantitiesProgramProgram: string | null;
    CatalogId: string | null;
    CatalogItemId: string | null;
    EcotaxFurnitureId: string | null;
    PurchaseUnitPriceProgramProgram: string | null;
    LocalizableCaption2: string | null;
    LocalizableDesCom2: string | null;
    LocalizableDesComClear2: string | null;
    LocalizableCaption3: string | null;
    LocalizableCaption4: string | null;
    LocalizableCaption5: string | null;
    LocalizableDesCom3: string | null;
    LocalizableDesComClear3: string | null;
    LocalizableDesCom4: string | null;
    LocalizableDesComClear4: string | null;
    LocalizableDesCom5: string | null;
    LocalizableDesComClear5: string | null;
    IntrastatOriginCountryId: string | null;
    ParentRangeItemId: string | null;
    RangeTypeElementId0: string | null;
    RangeTypeElementId1: string | null;
    RangeTypeElementId2: string | null;
    RangeTypeElementId3: string | null;
    RangeTypeElementId4: string | null;
    DefaultAllowedStorehouseId: string | null;
    MaintenanceContractTemplateId: string | null;
    GuaranteeTypeId: string | null;
    StockBillOfQuantitiesProgramProgram: string | null;
    PosThumbnail: string | null;
    GiftVoucherCashValue: number | null;
    GiftVoucherValidityDuration: number | null;
    IsExtraFee: boolean;
    TimeUnitId: string | null;
    TechnicalDesCom: string | null;
    TechnicalDesComClear: string | null;
    LocalizableTechnicalDesCom2: string | null;
    LocalizableTechnicalDesComClear2: string | null;
    LocalizableTechnicalDesCom3: string | null;
    LocalizableTechnicalDesComClear3: string | null;
    LocalizableTechnicalDesCom4: string | null;
    LocalizableTechnicalDesComClear4: string | null;
    LocalizableTechnicalDesCom5: string | null;
    LocalizableTechnicalDesComClear5: string | null;
    CompetenceId: string | null;
    EquipmentTypeId: string | null;
    ScheduleEventTemplateId: string | null;
    CompetenceNumberToPlan: number | null;
    EquipmentTypeNumberToPlan: number | null;
    CadenceDuration: number;
    CadenceDurationType: number;
    CadenceDurationQuantity: number;
    InstallationTime: number;
    LabourCode: string | null;
    AutoUpdateLabourPrice: boolean;
    IsEquipment: boolean;
    InstallationCalculationType: number;
    MaterialPricesPurchasePrice: number;
    MaterialPricesChargeRate: number;
    MaterialPricesChargeAmount: number;
    MaterialPricesCostPrice: number;
    MaterialPricesInterestRate: number;
    MaterialPricesInterestAmount: number;
    MaterialPricesSalePriceVatExcluded: number;
    MaterialPricesBrandRate: number;
    MaterialPricesVatId: string;
    MaterialPricesVatAmount: number;
    MaterialPricesSalePriceVatIncluded: number;
    MaterialPricesAdvisedSalePriceVatExcluded: number;
    MaterialPricesSetItemSalePriceWithAdvisedSalePrice: boolean;
    MaterialPricesIsFixedPrice: boolean | null;
    MaterialPricesEcotaxFurnitureId: string | null;
    LabourPricesPurchasePrice: number;
    LabourPricesChargeRate: number;
    LabourPricesChargeAmount: number;
    LabourPricesCostPrice: number;
    LabourPricesInterestRate: number;
    LabourPricesInterestAmount: number;
    LabourPricesSalePriceVatExcluded: number;
    LabourPricesBrandRate: number;
    LabourPricesVatId: string;
    LabourPricesVatAmount: number;
    LabourPricesSalePriceVatIncluded: number;
    LabourPricesAdvisedSalePriceVatExcluded: number;
    LabourPricesSetItemSalePriceWithAdvisedSalePrice: boolean;
    LabourPricesIsFixedPrice: boolean | null;
    LabourPricesEcotaxFurnitureId: string | null;
    CanBePartiallyInvoiced: boolean;
    PickMovementDisallowedOnTotallyBookedItem: boolean;
    SalePriceModifiedDate: string | null;
    SalePriceModifiedUserId: string | null;
    TarifeoCode: string | null;
    TarifeoFullCode: string | null;
    TarifeoProducerId: string | null;
    ProducerName: string | null;
    TarifeoPriceDate: string | null;
    TarifeoPriceVersion: string | null;
    TarifeoUpdateDatetime: string | null;
    IsSubscription: boolean;
    SubscriptionPassings: number;
    SubscriptionTotalCostPrice: number;
    SubscriptionTotalPurchasePrice: number;
    SubscriptionTotalSalePriceVatExcluded: number;
    SubscriptionValidityDuration: number;
    id: number;
  }
  
 export interface StockDocument {
  id: number;
  DocumentDate: Date;
  Id: string;
  NumberPrefix: string;
  NumberSuffix: string;
  StorehouseId: string;
  TotalWeight?: number | string;
  TotalVolume?: number | string;
  DocumentLines: Lines[];
 }

 export interface Lines {
  id: number;
  ItemId: string;
  DocumentId: string;
  Quantity: number | string;
  DescriptionClear: string;
  StorehouseId: string;
  
 }
  
    