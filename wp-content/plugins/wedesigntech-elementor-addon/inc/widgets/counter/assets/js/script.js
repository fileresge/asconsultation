(function($) {

    const wdtCounterWidgetHandler = function($scope, $) {

        $scope.find('.wdt-content-counter-number').countTo({
            decimals: 2,
            formatter: function(value, options) {

                let toValue = jQuery(this).data('to');

                if (toValue >= 1000) {
                    // Format numbers greater than or equal to 1000 with thousand separators
                    return Number(value.toFixed(options.decimals)).toLocaleString();
                } else {
                    // Check if the target value is an integer or not
                    if (Number.isInteger(toValue)) {
                        return value.toFixed(0);
                    } else {
                        return value.toFixed(options.decimals);
                    }
                }

            }
        });

    };

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-counter.default', wdtCounterWidgetHandler);
    });

})(jQuery);