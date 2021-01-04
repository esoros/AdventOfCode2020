using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace helloworld
{
    internal sealed class Rule {
        public string BagDescription {get; set;} = "";

        public List<RuleCondition> Conditions {get; set;} = new List<RuleCondition>();
    }
    
    internal sealed class RuleCondition {
        public string BagDesription {get; set;}
        public int Quantity {get; set;}

        public RuleCondition() {

        }

        public RuleCondition(string condition) {
            var parts = condition.Trim().Split(" ");
            Quantity = int.Parse(parts[0]);
            BagDesription = $"{parts[1]} {parts[2]}";
        }
    }

    class Program
    {        
        public static Dictionary<string, bool> cache = new Dictionary<string, bool>();
        
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            var rules = File.ReadAllLines("input.txt")
                .Select(toRule)
                .Aggregate(new Dictionary<string, Rule>(), (aggr, value) => processRule(aggr, value));
            
            
            /* part1
            var bag = "shiny gold";
            var result = rules.Keys.Where(k => k != bag)
                                   .Select(k => findBag(rules, k, bag))
                                   .Select(b => b ? 1 : 0)
                                   .Sum();
            */

            var bag = "shiny gold";
            var result = countBag(rules, bag);
            Console.Out.WriteLine(result);
        }

        //(recursively) count the number of bags inside of the current bag type.
        static int countBag(Dictionary<String, Rule> rules, string bag) {
            if(!rules.TryGetValue(bag, out var rule)) {
                return 0;
            }

            return rule.Conditions
                .Select(c => c.Quantity + (c.Quantity + countBag(rules, c.BagDesription)))
                .Sum();
        }

        //recursively drill into the map and find if the current source ends in the target or not.
        //we end up solving the same sub-problem, so we can cache the results.
        static bool findBag(Dictionary<string, Rule> rules, string bagSource, string bagTarget) {            
            if(bagSource == bagTarget) {
                cache[bagSource] = true;
                return true;
            }
            
            if (!rules.TryGetValue(bagSource, out var rule) || rule.Conditions.Count == 0) {
                cache[bagSource] = false;
                return false;
            }

            foreach(var condition in rule.Conditions) {
                if(findBag(rules, condition.BagDesription, bagTarget)) {
                    cache[bagSource] = true;
                    return true;
                }
            }

            cache[bagSource] = false;
            return false;
        }

        private static Dictionary<string, Rule> processRule(Dictionary<string, Rule> map, Rule rule) {
            map[rule.BagDescription] = rule;
            return map;
        }

        private static Rule toRule(string line) {
            var ruleParts = line.Split("contain");
            var rule = new Rule();

            var bagDescriptionParts = ruleParts[0].Trim().Split(" ");
            rule.BagDescription = $"{bagDescriptionParts[0]} {bagDescriptionParts[1]}";
            
            if(ruleParts[1].Contains("no other bags.")) {
                var condition = new RuleCondition() { BagDesription = "", Quantity = 0 };
                rule.Conditions.Add(condition);
            } else {
                var conditions = ruleParts[1].Split(",");
                foreach(var conditionString in conditions) {
                    var condition = new RuleCondition(conditionString);
                    rule.Conditions.Add(condition);
                }
            }
            return rule;
        }
    }
}
