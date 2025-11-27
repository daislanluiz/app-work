import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Package, Truck, Percent, Briefcase } from 'lucide-react';

export const FinancialCalculator: React.FC = () => {
  const [productName, setProductName] = useState('');
  
  // Use string for inputs to allow empty state without forcing "0"
  const [baseCostStr, setBaseCostStr] = useState('');
  const [deliveryCostStr, setDeliveryCostStr] = useState('');
  const [taxRateStr, setTaxRateStr] = useState('10');
  const [profitMarginStr, setProfitMarginStr] = useState('30');
  const [reinvestmentRate, setReinvestmentRate] = useState(25); // Default 25%

  const [results, setResults] = useState({
    finalPrice: 0,
    taxAmount: 0,
    totalCost: 0,
    netProfit: 0,
    reinvestmentAmount: 0,
    ownerTakeHome: 0
  });

  useEffect(() => {
    const cost = parseFloat(baseCostStr) || 0;
    const delivery = parseFloat(deliveryCostStr) || 0;
    const tax = parseFloat(taxRateStr) || 0;
    const margin = parseFloat(profitMarginStr) || 0;

    // Simplified Pricing Model:
    // 1. Calculate Costs
    const totalDirectCost = cost + delivery;
    
    // 2. Add Profit Margin (Markup on Cost)
    const profitAmountRaw = totalDirectCost * (margin / 100);
    const priceBeforeTax = totalDirectCost + profitAmountRaw;
    
    // 3. Add Tax (Simple Sales Tax model: added on top)
    const taxAmount = priceBeforeTax * (tax / 100);
    const finalPrice = priceBeforeTax + taxAmount;

    // 4. Calculate Net Profit (Real Profit)
    // Profit = Revenue - Expenses (Cost + Delivery + Tax)
    // Using finalPrice as Revenue
    const netProfit = finalPrice - totalDirectCost - taxAmount;

    // 5. Reinvestment
    const reinvestment = netProfit * (reinvestmentRate / 100);
    const takeHome = netProfit - reinvestment;

    setResults({
      finalPrice: finalPrice > 0 ? finalPrice : 0,
      taxAmount: taxAmount > 0 ? taxAmount : 0,
      totalCost: totalDirectCost,
      netProfit: netProfit > 0 ? netProfit : 0,
      reinvestmentAmount: reinvestment > 0 ? reinvestment : 0,
      ownerTakeHome: takeHome > 0 ? takeHome : 0
    });
  }, [baseCostStr, deliveryCostStr, taxRateStr, profitMarginStr, reinvestmentRate]);

  return (
    <div className="pb-24 pt-4 px-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Calculadora de Negócios</h1>
        <p className="text-slate-400 text-sm">Precificação inteligente e metas de reinvestimento.</p>
      </header>

      <div className="grid gap-6">
        
        {/* Input Section */}
        <div className="bg-secondary p-5 rounded-2xl border border-slate-700 shadow-lg">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Package size={18} className="mr-2 text-primary" /> Dados do Produto
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Nome do Produto/Serviço</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Ex: Consultoria, Bolo, Logo..."
                className="w-full bg-background border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Custo Base (R$)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <input
                    type="number"
                    value={baseCostStr}
                    onChange={(e) => setBaseCostStr(e.target.value)}
                    className="w-full bg-background border border-slate-700 rounded-lg p-3 pl-7 text-white focus:border-primary focus:outline-none"
                    placeholder="0.00"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Entrega (R$)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500"><Truck size={14}/></span>
                  <input
                    type="number"
                    value={deliveryCostStr}
                    onChange={(e) => setDeliveryCostStr(e.target.value)}
                    className="w-full bg-background border border-slate-700 rounded-lg p-3 pl-8 text-white focus:border-primary focus:outline-none"
                    placeholder="0.00"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Imposto (%)</label>
                <div className="relative">
                  <span className="absolute right-3 top-3 text-slate-500"><Percent size={14}/></span>
                  <input
                    type="number"
                    value={taxRateStr}
                    onChange={(e) => setTaxRateStr(e.target.value)}
                    className="w-full bg-background border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Margem Lucro (%)</label>
                <div className="relative">
                  <span className="absolute right-3 top-3 text-slate-500"><TrendingUp size={14}/></span>
                  <input
                    type="number"
                    value={profitMarginStr}
                    onChange={(e) => setProfitMarginStr(e.target.value)}
                    className="w-full bg-background border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result Card - The Big Number */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 pointer-events-none"></div>
          <p className="text-indigo-100 text-sm font-medium mb-1 uppercase tracking-wider">Preço Final para Cliente</p>
          <h2 className="text-4xl font-bold text-white mb-2">
            R$ {results.finalPrice.toFixed(2)}
          </h2>
          <div className="flex justify-center items-center space-x-2 text-xs text-indigo-100 mt-2 bg-black/20 py-2 rounded-full px-4 inline-flex mx-auto flex-wrap">
             <span className="whitespace-nowrap">Custo Total: R$ {results.totalCost.toFixed(2)}</span>
             <span className="hidden sm:inline">•</span>
             <span className="whitespace-nowrap">Imposto: R$ {results.taxAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Profit & Reinvestment Breakdown */}
        <div className="grid grid-cols-1 gap-4">
           {/* Net Profit */}
           <div className="bg-slate-900/50 p-5 rounded-2xl border border-green-900/50 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold">Lucro Líquido</p>
                <h3 className="text-2xl font-bold text-green-400">R$ {results.netProfit.toFixed(2)}</h3>
              </div>
              <div className="bg-green-500/10 p-3 rounded-full">
                <DollarSign className="text-green-500" size={24} />
              </div>
           </div>

           {/* Reinvestment Strategy */}
           <div className="bg-secondary p-5 rounded-2xl border-l-4 border-l-yellow-500 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="text-white font-bold flex items-center">
                      <Briefcase size={18} className="mr-2 text-yellow-500" /> 
                      Fundo de Reinvestimento
                   </h3>
                   <p className="text-slate-400 text-xs mt-1">
                      Para manter o negócio vivo, recomenda-se reinvestir parte do lucro.
                   </p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                   <span>Taxa de Reinvestimento</span>
                   <span>{reinvestmentRate}% do Lucro</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={reinvestmentRate} 
                  onChange={(e) => setReinvestmentRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
              </div>

              <div className="flex gap-4">
                 <div className="flex-1 bg-background p-3 rounded-lg border border-slate-700">
                    <p className="text-xs text-yellow-500 font-bold uppercase mb-1">Reinvestir</p>
                    <p className="text-xl text-white font-semibold">R$ {results.reinvestmentAmount.toFixed(2)}</p>
                 </div>
                 <div className="flex-1 bg-background p-3 rounded-lg border border-slate-700">
                    <p className="text-xs text-green-500 font-bold uppercase mb-1">Sua Retirada</p>
                    <p className="text-xl text-white font-semibold">R$ {results.ownerTakeHome.toFixed(2)}</p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};