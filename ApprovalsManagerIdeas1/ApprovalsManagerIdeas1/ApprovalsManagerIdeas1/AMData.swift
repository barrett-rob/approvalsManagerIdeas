//
//  AMData.swift
//  ApprovalsManagerIdeas1
//
//  Created by Rob Barrett on 22/09/2014.
//  Copyright (c) 2014 Ventyx. All rights reserved.
//

import Foundation

class AMData {
    let itemTypes = [ "Contract Variation", "Leave Request", "Non Order Invoice"]
    var records: [AMRecord]?
    init() {
        var n = itemTypes.count * 5
        for i in 1...n {
            let rec = AMRecord()
            let m = i % itemTypes.count
            rec.itemType = itemTypes[m]
            rec.itemId = String(format: "3", arguments: [i])
            rec.itemDescription = "Please approve this " + rec.itemType!
            addRecord(rec)
        }
    }
    func addRecord(rec: AMRecord) {
        if let rs = records? {
            // noop
        } else {
            records = [AMRecord]()
        }
        records!.append(rec)
    }
    func getRecords(itemType: String) -> [AMRecord] {
        if let rs = records? {
            return rs.filter({ $0.itemType == itemType })
        } else {
            return [AMRecord]();
        }
    }
    func getItemTypes() -> [String: Int] {
        var its = [String: Int]()
        if let rs = records? {
            for r in rs {
                if let it = r.itemType? {
                    if let n = its[it] {
                        its[it] = n + 1
                    } else {
                        its[it] = 1
                    }
                }
            }
        }
        return its;
    }
}