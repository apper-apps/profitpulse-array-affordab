import { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Chart from "react-apexcharts";

const CostBreakdown = ({ results, calculationMode = 'standard' }) => {
  const [viewMode, setViewMode] = useState(calculationMode === 'visual' ? 'chart' : 'table');
  
  if (!results || !results.calculations) return null;

  const { calculations } = results;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };
  const costItems = [
    {
      label: "Product Cost",
      value: calculations.productCost * calculations.quantitySold,
      icon: "Package",
      color: "text-blue-400"
    },
    {
      label: "Delivery Charges",
      value: calculations.deliveryCharges * calculations.quantitySold,
      icon: "Truck",
      color: "text-green-400"
    },
    {
      label: "Payment Gateway",
      value: calculations.paymentGatewayFees * calculations.quantitySold,
      icon: "CreditCard",
      color: "text-purple-400"
    },
    {
      label: "Advertising Cost",
      value: calculations.advertisingCost * calculations.quantitySold,
      icon: "Megaphone",
      color: "text-orange-400"
    },
    {
      label: "GST Amount",
      value: results.gstAmount,
      icon: "FileText",
      color: "text-yellow-400"
    },
    {
      label: "Other Fees",
      value: calculations.otherFees * calculations.quantitySold,
      icon: "Settings",
      color: "text-gray-400"
    },
  ];

const totalCosts = costItems.reduce((sum, item) => sum + item.value, 0);

  // Chart configuration for visual mode
  const chartOptions = {
    chart: {
      type: 'pie',
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      }
    },
    colors: ['#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ef4444', '#6b7280'],
    labels: costItems.filter(item => item.value > 0).map(item => item.label),
    series: costItems.filter(item => item.value > 0).map(item => item.value),
    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: '#ffffff',
        useSeriesColors: true
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#ffffff'],
        fontWeight: 600
      },
      formatter: function(val, opts) {
        return opts.w.config.series[opts.seriesIndex] > 0 ? 
          formatCurrency(opts.w.config.series[opts.seriesIndex]) : '';
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '40%'
        },
        expandOnClick: true
      }
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px'
      },
      y: {
        formatter: function(val) {
          return formatCurrency(val);
        }
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  // Break-even analysis chart configuration
  const breakEvenChartOptions = {
    chart: {
      type: 'line',
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
      zoom: {
        enabled: true,
        type: 'x'
      }
    },
    colors: ['#10b981', '#ef4444', '#3b82f6'],
    series: [
      {
        name: 'Total Revenue',
        data: Array.from({length: Math.max(results.breakEvenUnits * 2, 10)}, (_, i) => {
          const units = i + 1;
          const revenuePerUnit = (calculations.sellingPrice - (calculations.sellingPrice * calculations.gstRate / 100));
          return [units, units * revenuePerUnit];
        }),
        color: '#10b981'
      },
      {
        name: 'Total Costs',
        data: Array.from({length: Math.max(results.breakEvenUnits * 2, 10)}, (_, i) => {
          const units = i + 1;
          const costPerUnit = calculations.productCost + calculations.deliveryCharges + 
                             calculations.paymentGatewayFees + calculations.advertisingCost + calculations.otherFees;
          return [units, units * costPerUnit];
        }),
        color: '#ef4444'
      }
    ],
    annotations: {
      points: [{
        x: results.breakEvenUnits,
        y: results.breakEvenRevenue,
        marker: {
          size: 8,
          fillColor: '#3b82f6',
          strokeColor: '#ffffff',
          strokeWidth: 2,
          radius: 6,
        },
        label: {
          text: `Break-Even Point\n${results.breakEvenUnits} units\n${formatCurrency(results.breakEvenRevenue)}`,
          borderColor: '#3b82f6',
          borderWidth: 1,
          borderRadius: 6,
          textAnchor: 'start',
          offsetX: 10,
          offsetY: -10,
          style: {
            background: '#1f2937',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 600,
            padding: {
              left: 8,
              right: 8,
              top: 4,
              bottom: 4
            }
          }
        }
      }]
    },
    xaxis: {
      title: {
        text: 'Units Sold',
        style: {
          color: '#ffffff',
          fontSize: '12px'
        }
      },
      labels: {
        style: {
          colors: '#ffffff'
        }
      },
      axisBorder: {
        color: '#374151'
      },
      axisTicks: {
        color: '#374151'
      }
    },
    yaxis: {
      title: {
        text: 'Amount (₹)',
        style: {
          color: '#ffffff',
          fontSize: '12px'
        }
      },
      labels: {
        style: {
          colors: '#ffffff'
        },
        formatter: function(val) {
          return formatCurrency(val);
        }
      },
      axisBorder: {
        color: '#374151'
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      labels: {
        colors: '#ffffff',
        useSeriesColors: true
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5
      }
    },
    grid: {
      borderColor: '#374151',
      strokeDashArray: 3
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px'
      },
      x: {
        formatter: function(val) {
          return `${val} units`;
        }
      },
      y: {
        formatter: function(val) {
          return formatCurrency(val);
        }
      }
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    markers: {
      size: 0,
      hover: {
        size: 6
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 300
        },
        legend: {
          position: 'bottom'
        },
        annotations: {
          points: [{
            x: results.breakEvenUnits,
            y: results.breakEvenRevenue,
            marker: {
              size: 6,
              fillColor: '#3b82f6',
              strokeColor: '#ffffff',
              strokeWidth: 2,
            },
            label: {
              text: `${results.breakEvenUnits} units`,
              offsetX: 5,
              offsetY: -5,
              style: {
                fontSize: '10px',
                padding: {
                  left: 4,
                  right: 4,
                  top: 2,
                  bottom: 2
                }
              }
            }
          }]
        }
      }
    }]
  };

  return (
<Card className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-lg">
            <ApperIcon name="PieChart" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Cost Breakdown</h3>
            <p className="text-sm text-gray-400">
              {calculationMode === 'visual' ? 'Interactive visual analysis' : 'Detailed cost analysis'}
            </p>
          </div>
        </div>
        
{(costItems.some(item => item.value > 0) || calculationMode === 'breakeven') && (
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <ApperIcon name="List" size={16} />
            </Button>
            <Button
              variant={viewMode === 'chart' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('chart')}
            >
              <ApperIcon name="PieChart" size={16} />
            </Button>
            {calculationMode === 'breakeven' && (
              <Button
                variant={viewMode === 'breakeven' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('breakeven')}
              >
                <ApperIcon name="TrendingUp" size={16} />
              </Button>
            )}
          </div>
        )}
      </div>

{viewMode === 'breakeven' && calculationMode === 'breakeven' ? (
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <Chart
              options={breakEvenChartOptions}
              series={breakEvenChartOptions.series}
              type="line"
              height={400}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ApperIcon name="Target" size={16} className="text-accent-400" />
                <span className="text-sm font-medium text-white">Break-Even Units</span>
              </div>
              <span className="text-2xl font-bold text-accent-400">
                {results.breakEvenUnits}
              </span>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ApperIcon name="DollarSign" size={16} className="text-blue-400" />
                <span className="text-sm font-medium text-white">Break-Even Revenue</span>
              </div>
              <span className="text-lg font-bold text-blue-400">
                {formatCurrency(results.breakEvenRevenue)}
              </span>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ApperIcon name="TrendingUp" size={16} className="text-purple-400" />
                <span className="text-sm font-medium text-white">Profit Per Unit</span>
              </div>
              <span className="text-lg font-bold text-purple-400">
                {formatCurrency(results.perUnitProfit)}
              </span>
            </div>
          </div>
        </div>
      ) : viewMode === 'chart' && costItems.some(item => item.value > 0) ? (
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type="pie"
              height={350}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {costItems.map((item, index) => (
            item.value > 0 && (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <ApperIcon name={item.icon} size={16} className={item.color} />
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-white">
                    {formatCurrency(item.value)}
                  </span>
                  <div className="text-xs text-gray-400">
                    {((item.value / totalCosts) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ApperIcon name="Calculator" size={16} className="text-accent-400" />
            <span className="font-medium text-white">Total Costs</span>
          </div>
          <span className="text-lg font-bold text-accent-400">
            {formatCurrency(totalCosts)}
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ApperIcon name="TrendingUp" size={16} className="text-accent-400" />
            <span className="font-medium text-white">Revenue</span>
          </div>
          <span className="text-lg font-bold text-accent-400">
            {formatCurrency(results.totalRevenue)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CostBreakdown;