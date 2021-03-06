import TranslationService from "services/TranslationService";

Vue.component("item-filter", {

    delimiters: ["${", "}"],

    props: [
        "template",
        "facet"
    ],

    computed:
    {
        facets()
        {
            return this.facet.values.sort((facetA, facetB) =>
            {
                if (facetA.position > facetB.position)
                {
                    return 1;
                }
                if (facetA.position < facetB.position)
                {
                    return -1;
                }

                return 0;
            });
        },

        facetName()
        {
            if (this.facet.translationKey && this.facet.translationKey.length > 0)
            {
                return TranslationService.translate("Ceres::Template." + this.facet.translationKey);
            }

            return this.facet.name;
        },

        ...Vuex.mapState({
            selectedFacets: state => state.itemList.selectedFacets,
            isLoading: state => state.itemList.isLoading
        })
    },

    created()
    {
        this.$options.template = this.template || "#vue-item-filter";
    },

    methods:
    {
        updateFacet(facetValue)
        {
            this.$store.dispatch("selectFacet", facetValue);
        },

        isSelected(facetValueId)
        {
            return this.selectedFacets.findIndex(selectedFacet => selectedFacet.id === facetValueId) > -1;
        }
    }
});
